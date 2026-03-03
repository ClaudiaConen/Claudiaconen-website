import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!RESEND_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error('Missing required environment variables');
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    console.log('Fetching all advent registrations...');
    const { data: registrations, error } = await supabase
      .from('advent_registrations')
      .select('first_name, email')
      .eq('email_confirmed', true);

    if (error) {
      throw error;
    }

    if (!registrations || registrations.length === 0) {
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Keine Registrierungen gefunden',
          added: 0,
          skipped: 0,
          failed: 0,
        }),
        {
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
          status: 200,
        }
      );
    }

    console.log(`Found ${registrations.length} registrations to migrate`);

    const results = {
      added: 0,
      skipped: 0,
      failed: 0,
      details: [] as Array<{ email: string; status: string; error?: string }>,
    };

    for (const registration of registrations) {
      try {
        const resendResponse = await fetch('https://api.resend.com/audiences/contacts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            email: registration.email,
            first_name: registration.first_name,
            unsubscribed: false,
          }),
        });

        const resendData = await resendResponse.json();

        if (resendResponse.ok) {
          results.added++;
          results.details.push({
            email: registration.email,
            status: 'added',
          });
          console.log(`✓ Added: ${registration.email}`);
        } else if (resendResponse.status === 400 && resendData.message?.includes('already exists')) {
          results.skipped++;
          results.details.push({
            email: registration.email,
            status: 'skipped',
            error: 'already exists',
          });
          console.log(`○ Skipped (already exists): ${registration.email}`);
        } else {
          results.failed++;
          results.details.push({
            email: registration.email,
            status: 'failed',
            error: resendData.message || 'Unknown error',
          });
          console.error(`✗ Failed: ${registration.email}`, resendData);
        }

        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        results.failed++;
        results.details.push({
          email: registration.email,
          status: 'failed',
          error: error instanceof Error ? error.message : 'Unknown error',
        });
        console.error(`✗ Error processing: ${registration.email}`, error);
      }
    }

    console.log('Migration complete:', results);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Migration abgeschlossen',
        total: registrations.length,
        added: results.added,
        skipped: results.skipped,
        failed: results.failed,
        details: results.details,
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error in migrate-advent-contacts-to-resend:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
        status: 500,
      }
    );
  }
});