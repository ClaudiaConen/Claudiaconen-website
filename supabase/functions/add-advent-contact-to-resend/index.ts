import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface RequestBody {
  email: string;
  firstName: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { email, firstName }: RequestBody = await req.json();

    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');

    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured');
      throw new Error('E-Mail-Service nicht konfiguriert');
    }

    console.log('Adding contact to Resend:', email);

    const resendResponse = await fetch('https://api.resend.com/audiences/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        email: email,
        first_name: firstName,
        unsubscribed: false,
      }),
    });

    const resendData = await resendResponse.json();

    if (!resendResponse.ok) {
      if (resendResponse.status === 400 && resendData.message?.includes('already exists')) {
        console.log('Contact already exists in Resend:', email);
        return new Response(
          JSON.stringify({
            success: true,
            message: 'Kontakt bereits vorhanden',
            alreadyExists: true,
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

      console.error('Resend API error:', resendData);
      throw new Error('Kontakt konnte nicht hinzugefügt werden');
    }

    console.log('Contact added successfully to Resend:', resendData);

    const emailHtml = `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Willkommen zum Adventskalender 2025</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #e8f4f8;">
  <div style="max-width: 600px; margin: 40px auto; background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.15);">
    <div style="background: linear-gradient(135deg, #87CEEB 0%, #4682B4 100%); padding: 40px; text-align: center;">
      <h1 style="color: white; font-size: 32px; margin: 0 0 10px 0;">🎄 Willkommen zum Adventskalender!</h1>
      <p style="color: rgba(255,255,255,0.95); font-size: 18px; margin: 0;">24 Tage Business-Wissen, das wirklich wirkt</p>
    </div>
    
    <div style="padding: 40px;">
      <p style="color: #1a1a2e; font-size: 18px; line-height: 1.6; margin: 0 0 20px 0;">
        Hallo ${firstName},
      </p>
      
      <p style="color: #2c3e50; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
        wie schön, dass du dabei bist! 🎁
      </p>
      
      <p style="color: #2c3e50; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
        Deine Anmeldung zum <strong>Adventskalender 2025</strong> war erfolgreich. Ab dem <strong>1. Dezember</strong> öffnest du jeden Tag ein neues Türchen mit wertvollen Impulsen, praktischen Tools und sofort umsetzbarem Wissen für dein Business.
      </p>
      
      <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border-left: 4px solid #4682B4; padding: 20px; margin: 30px 0; border-radius: 10px;">
        <p style="color: #1e40af; font-size: 16px; line-height: 1.6; margin: 0;">
          <strong>💡 Das erwartet dich:</strong><br><br>
          ✨ Praxisnahe Strategien für mehr Sichtbarkeit<br>
          🎯 Bewährte Methoden für deine Wirkung<br>
          🚀 Sofort umsetzbare Business-Impulse<br>
          🎁 Exklusive Downloads und Ressourcen
        </p>
      </div>
      
      <div style="text-align: center; margin: 40px 0;">
        <a href="https://claudiaconen.com/adventskalender/kalender" style="display: inline-block; padding: 16px 40px; background: linear-gradient(135deg, #D4AF37 0%, #FFD700 100%); color: #1a1a2e; text-decoration: none; font-weight: bold; font-size: 18px; border-radius: 50px; box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);">
          Zum Adventskalender
        </a>
      </div>
      
      <p style="color: #2c3e50; font-size: 16px; line-height: 1.6; margin: 30px 0 0 0;">
        Ich freue mich darauf, dich durch diese besondere Zeit zu begleiten!
      </p>
      
      <p style="color: #2c3e50; font-size: 16px; line-height: 1.6; margin: 20px 0 0 0;">
        Herzliche Grüße,<br>
        <strong>Claudia</strong>
      </p>
    </div>
    
    <div style="background: #1a1a2e; padding: 30px; text-align: center;">
      <p style="color: rgba(255,255,255,0.9); font-size: 20px; font-weight: bold; margin: 0 0 10px 0; background: linear-gradient(135deg, #D4AF37 0%, #FFD700 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
        Claudia Conen
      </p>
      <p style="color: rgba(255,255,255,0.7); font-size: 14px; margin: 0 0 15px 0;">
        Die Stimme für deine Wirkung
      </p>
      <a href="https://claudiaconen.com" style="color: #FFD700; text-decoration: none; font-size: 14px;">
        claudiaconen.com
      </a>
    </div>
  </div>
</body>
</html>
    `;

    console.log('Sending welcome email to:', email);

    const welcomeEmailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Claudia Conen <noreply@claudiaconen.com>',
        to: [email],
        subject: '🎄 Willkommen zum Adventskalender 2025!',
        html: emailHtml,
      }),
    });

    if (!welcomeEmailResponse.ok) {
      const errorData = await welcomeEmailResponse.text();
      console.error('Welcome email error:', errorData);
    } else {
      const emailData = await welcomeEmailResponse.json();
      console.log('Welcome email sent successfully:', emailData);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Kontakt erfolgreich hinzugefügt',
        contactId: resendData.id,
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
    console.error('Error in add-advent-contact-to-resend:', error);
    
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