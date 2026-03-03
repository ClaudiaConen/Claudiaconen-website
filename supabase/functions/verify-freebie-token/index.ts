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
    const url = new URL(req.url);
    const token = url.searchParams.get('token');

    if (!token) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Token fehlt',
          status: 'error',
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data: lead, error } = await supabase
      .from('linkedin_freebie_leads')
      .select('email, opted_in, token_expires_at')
      .eq('confirmation_token', token)
      .maybeSingle();

    if (error) {
      console.error('Database error:', error);
      throw error;
    }

    if (!lead) {
      return new Response(
        JSON.stringify({
          success: false,
          status: 'error',
          message: 'Token nicht gefunden',
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 404,
        }
      );
    }

    const now = new Date();
    const expiresAt = new Date(lead.token_expires_at);

    if (now > expiresAt) {
      return new Response(
        JSON.stringify({
          success: false,
          status: 'expired',
          email: lead.email,
          message: 'Token abgelaufen',
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 410,
        }
      );
    }

    if (lead.opted_in) {
      return new Response(
        JSON.stringify({
          success: true,
          status: 'success',
          email: lead.email,
          message: 'Bereits bestätigt',
          alreadyConfirmed: true,
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        }
      );
    }

    const { error: updateError } = await supabase
      .from('linkedin_freebie_leads')
      .update({
        opted_in: true,
        opted_in_at: new Date().toISOString(),
        download_count: 1,
        last_download_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('confirmation_token', token);

    if (updateError) {
      console.error('Update error:', updateError);
      throw updateError;
    }

    return new Response(
      JSON.stringify({
        success: true,
        status: 'success',
        email: lead.email,
        message: 'E-Mail erfolgreich bestätigt',
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error in verify-freebie-token:', error);

    return new Response(
      JSON.stringify({
        success: false,
        status: 'error',
        error: error instanceof Error ? error.message : 'Unbekannter Fehler',
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});