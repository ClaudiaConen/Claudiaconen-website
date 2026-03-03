import "jsr:@supabase/functions-js/edge-runtime.d.ts";

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
      throw new Error('Environment variables not configured');
    }

    const url = new URL(req.url);
    const testDay = url.searchParams.get('test_day');

    let currentDay = 0;

    if (testDay) {
      currentDay = parseInt(testDay, 10);
      console.log(`Test mode: Using day ${currentDay}`);
    } else {
      const now = new Date();
      const month = now.getMonth();
      const day = now.getDate();

      if (month === 11 && day >= 1 && day <= 24) {
        currentDay = day;
      }

      if (currentDay === 0) {
        console.log('Not in advent period, skipping email send');
        return new Response(
          JSON.stringify({
            success: true,
            message: 'Not in advent period',
            sent: 0,
          }),
          {
            headers: {
              ...corsHeaders,
              "Content-Type": "application/json",
            },
          }
        );
      }
    }

    console.log(`Sending daily notification for day ${currentDay}`);

    const supabaseResponse = await fetch(
      `${SUPABASE_URL}/rest/v1/advent_registrations?select=email,first_name&email_confirmed=eq.true`,
      {
        headers: {
          'apikey': SUPABASE_SERVICE_ROLE_KEY,
          'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        },
      }
    );

    if (!supabaseResponse.ok) {
      throw new Error('Failed to fetch registrations from Supabase');
    }

    const registrations = await supabaseResponse.json();
    console.log(`Found ${registrations.length} confirmed registrations`);

    const doorResponse = await fetch(
      `${SUPABASE_URL}/rest/v1/advent_doors?door_number=eq.${currentDay}&is_published=eq.true&select=*`,
      {
        headers: {
          'apikey': SUPABASE_SERVICE_ROLE_KEY,
          'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        },
      }
    );

    if (!doorResponse.ok) {
      throw new Error('Failed to fetch door data from Supabase');
    }

    const doors = await doorResponse.json();
    const todaysDoor = doors[0];

    if (!todaysDoor) {
      console.log(`No published door found for day ${currentDay}`);
      return new Response(
        JSON.stringify({
          success: true,
          message: 'No published door for today',
          sent: 0,
        }),
        {
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    console.log(`Sending emails for door ${currentDay}: ${todaysDoor.title}`);

    let successCount = 0;
    let errorCount = 0;

    for (const registration of registrations) {
      const emailHtml = `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Türchen ${currentDay} ist geöffnet!</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #e8f4f8;">
  <div style="max-width: 600px; margin: 40px auto; background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.15);">
    <div style="background: linear-gradient(135deg, #87CEEB 0%, #4682B4 100%); padding: 40px; text-align: center;">
      <div style="font-size: 48px; margin-bottom: 10px;">🎄</div>
      <h1 style="color: white; font-size: 32px; margin: 0 0 10px 0;">Türchen ${currentDay} ist geöffnet!</h1>
      <p style="color: rgba(255,255,255,0.95); font-size: 18px; margin: 0;">${todaysDoor.title}</p>
    </div>

    <div style="padding: 40px;">
      <p style="color: #1a1a2e; font-size: 18px; line-height: 1.6; margin: 0 0 20px 0;">
        Hallo ${registration.first_name},
      </p>

      <p style="color: #2c3e50; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
        ein neues Türchen wartet auf dich! 🎁
      </p>

      <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border-left: 4px solid #4682B4; padding: 20px; margin: 30px 0; border-radius: 10px;">
        <p style="color: #1e40af; font-size: 16px; line-height: 1.6; margin: 0;">
          <strong>${todaysDoor.teaser_text}</strong>
        </p>
      </div>

      <div style="text-align: center; margin: 40px 0;">
        <a href="https://claudiaconen.com/adventskalender/tuerchen/${currentDay}" style="display: inline-block; padding: 16px 40px; background: linear-gradient(135deg, #D4AF37 0%, #FFD700 100%); color: #1a1a2e; text-decoration: none; font-weight: bold; font-size: 18px; border-radius: 50px; box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);">
          Türchen ${currentDay} öffnen
        </a>
      </div>

      <p style="color: #2c3e50; font-size: 16px; line-height: 1.6; margin: 30px 0 0 0;">
        Viel Freude mit dem heutigen Impuls!
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

      try {
        const emailResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: 'Claudia Conen <noreply@claudiaconen.com>',
            to: [registration.email],
            subject: `🎄 Türchen ${currentDay} ist geöffnet: ${todaysDoor.title}`,
            html: emailHtml,
          }),
        });

        if (emailResponse.ok) {
          successCount++;
          const responseData = await emailResponse.json();
          console.log(`✅ Email sent successfully to ${registration.email} - ID: ${responseData.id}`);
        } else {
          errorCount++;
          const errorData = await emailResponse.text();
          console.error(`❌ Failed to send email to ${registration.email} - Status: ${emailResponse.status} - Error:`, errorData);
        }
      } catch (error) {
        errorCount++;
        console.error(`❌ Exception sending email to ${registration.email}:`, error);
      }

      await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log(`Email sending complete. Success: ${successCount}, Errors: ${errorCount}`);

    return new Response(
      JSON.stringify({
        success: true,
        message: `Daily notification sent for day ${currentDay}`,
        doorTitle: todaysDoor.title,
        totalRecipients: registrations.length,
        successCount,
        errorCount,
        day: currentDay,
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error('Error in send-daily-advent-notification:', error);

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