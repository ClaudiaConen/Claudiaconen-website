import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface RequestBody {
  email: string;
  source?: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { email, source = 'organic' }: RequestBody = await req.json();

    if (!email || !email.includes('@')) {
      throw new Error('Ungültige E-Mail-Adresse');
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const confirmationToken = crypto.randomUUID();
    const tokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const { data: existingLead } = await supabase
      .from('linkedin_freebie_leads')
      .select('id, email, opted_in')
      .eq('email', email)
      .maybeSingle();

    if (existingLead) {
      if (existingLead.opted_in) {
        return new Response(
          JSON.stringify({
            success: true,
            message: 'E-Mail bereits bestätigt',
            alreadyOptedIn: true,
          }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
          }
        );
      }

      await supabase
        .from('linkedin_freebie_leads')
        .update({
          confirmation_token: confirmationToken,
          token_expires_at: tokenExpiresAt.toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('email', email);
    } else {
      const { error: insertError } = await supabase
        .from('linkedin_freebie_leads')
        .insert({
          email,
          confirmation_token: confirmationToken,
          token_expires_at: tokenExpiresAt.toISOString(),
          source,
          opted_in: false,
        });

      if (insertError) throw insertError;
    }

    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');

    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured');
      throw new Error('E-Mail-Service nicht konfiguriert');
    }

    const confirmationUrl = `${req.headers.get('origin') || 'https://claudiaconen.com'}/linkedin-freebie-confirmed?token=${confirmationToken}`;

    const emailHtml = `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bestätige deine E-Mail-Adresse</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f7fa;">
  <div style="max-width: 600px; margin: 40px auto; background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.15);">
    <div style="background: linear-gradient(135deg, #D4AF37 0%, #FFD700 100%); padding: 40px; text-align: center;">
      <h1 style="color: #1a1a2e; font-size: 28px; margin: 0 0 10px 0;">✨ Fast geschafft!</h1>
      <p style="color: #1a1a2e; font-size: 16px; margin: 0;">Nur noch ein Schritt bis zu deinem Workbook</p>
    </div>
    
    <div style="padding: 40px;">
      <p style="color: #1a1a2e; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
        Hallo,
      </p>
      
      <p style="color: #2c3e50; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
        vielen Dank für dein Interesse an dem Workbook <strong>"Unverwechselbar Du - Dein 7-Schritte Content-Plan"</strong>.
      </p>
      
      <p style="color: #2c3e50; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
        Bitte bestätige deine E-Mail-Adresse, indem du auf den folgenden Button klickst. Danach erhältst du sofort Zugriff auf dein Workbook:
      </p>
      
      <div style="text-align: center; margin: 40px 0;">
        <a href="${confirmationUrl}" style="display: inline-block; padding: 16px 40px; background: linear-gradient(135deg, #D4AF37 0%, #FFD700 100%); color: #1a1a2e; text-decoration: none; font-weight: bold; font-size: 18px; border-radius: 50px; box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);">
          E-Mail bestätigen & Workbook erhalten
        </a>
      </div>
      
      <div style="background: #f0f8ff; border-left: 4px solid #3b82f6; padding: 20px; border-radius: 8px; margin: 30px 0;">
        <p style="color: #1e40af; font-size: 14px; line-height: 1.6; margin: 0; font-weight: 600;">
          💡 Was dich erwartet:
        </p>
        <ul style="color: #374151; font-size: 14px; line-height: 1.8; margin: 10px 0 0 0; padding-left: 20px;">
          <li>7 praxiserprobte Schritte zur Unverwechselbarkeit</li>
          <li>KI-Prompts für deinen Content</li>
          <li>Sofort umsetzbare Strategien</li>
        </ul>
      </div>
      
      <p style="color: #666; font-size: 14px; line-height: 1.6; margin: 30px 0 0 0; padding-top: 20px; border-top: 1px solid #eee;">
        Falls der Button nicht funktioniert, kopiere diesen Link in deinen Browser:<br>
        <a href="${confirmationUrl}" style="color: #D4AF37; word-break: break-all;">${confirmationUrl}</a>
      </p>
      
      <p style="color: #999; font-size: 12px; margin: 20px 0 0 0;">
        Dieser Link ist 24 Stunden gültig. Aus Datenschutzgründen wird er danach automatisch gelöscht.
      </p>
    </div>
    
    <div style="background: #1a1a2e; padding: 30px; text-align: center;">
      <p style="color: rgba(255,255,255,0.9); font-size: 20px; font-weight: bold; margin: 0 0 10px 0; background: linear-gradient(135deg, #D4AF37 0%, #FFD700 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
        Claudia Conen
      </p>
      <p style="color: rgba(255,255,255,0.7); font-size: 14px; margin: 0 0 15px 0;">
        Die Umsatzstimme
      </p>
      <a href="https://claudiaconen.com" style="color: #FFD700; text-decoration: none; font-size: 14px;">
        claudiaconen.com
      </a>
    </div>
  </div>
</body>
</html>
    `;

    console.log('Sending confirmation email to:', email);
    console.log('Confirmation URL:', confirmationUrl);

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Claudia Conen <noreply@claudiaconen.com>',
        to: [email],
        subject: 'Bestätige deine E-Mail: Unverwechselbar Du Workbook',
        html: emailHtml,
      }),
    });

    if (!resendResponse.ok) {
      const errorData = await resendResponse.text();
      console.error('Resend API error:', errorData);
      throw new Error('E-Mail konnte nicht versendet werden');
    }

    const resendData = await resendResponse.json();
    console.log('Email sent successfully:', resendData);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Bestätigungs-E-Mail wurde versendet',
        emailId: resendData.id,
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
    console.error('Error in send-freebie-confirmation:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unbekannter Fehler',
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