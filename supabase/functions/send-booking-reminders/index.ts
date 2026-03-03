import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

async function sendReminderEmail(
  booking: any,
  reminderType: '24h' | '3h',
  resendApiKey: string
): Promise<{ success: boolean; errorMessage?: string }> {
  const appointmentDate = new Date(booking.appointment_date);
  const formattedDate = appointmentDate.toLocaleDateString('de-DE', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const startTime = booking.start_time.substring(0, 5);
  const endTime = booking.end_time.substring(0, 5);
  const duration = booking.appointment_type.duration_minutes;

  const timeText = reminderType === '24h' ? 'in 24 Stunden' : 'in 3 Stunden';
  const emojiIcon = reminderType === '24h' ? '⏰' : '⚡';

  const emailHtml = `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Terminerinnerung</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f7fa;">
  <div style="max-width: 600px; margin: 40px auto; background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.15);">
    <div style="background: linear-gradient(135deg, #D4AF37 0%, #FFD700 100%); padding: 40px; text-align: center;">
      <h1 style="color: #1a1a2e; font-size: 28px; margin: 0 0 10px 0;">${emojiIcon} Terminerinnerung</h1>
      <p style="color: #1a1a2e; font-size: 16px; margin: 0;">Dein Termin findet ${timeText} statt!</p>
    </div>

    <div style="padding: 40px;">
      <p style="color: #1a1a2e; font-size: 18px; line-height: 1.6; margin: 0 0 20px 0; font-weight: bold;">
        Hallo ${booking.customer_name},
      </p>

      <p style="color: #2c3e50; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
        dies ist eine freundliche Erinnerung an deinen bevorstehenden Termin ${timeText}.
      </p>

      <div style="background: #f8f9fa; border-left: 4px solid #D4AF37; padding: 25px; margin: 30px 0; border-radius: 8px;">
        <h2 style="color: #1a1a2e; font-size: 20px; margin: 0 0 20px 0;">📅 Deine Termindetails</h2>

        <div style="margin-bottom: 15px;">
          <strong style="color: #666; display: block; font-size: 14px; margin-bottom: 5px;">Terminart:</strong>
          <span style="color: #1a1a2e; font-size: 16px;">${booking.appointment_type.name}</span>
        </div>

        <div style="margin-bottom: 15px;">
          <strong style="color: #666; display: block; font-size: 14px; margin-bottom: 5px;">Datum:</strong>
          <span style="color: #1a1a2e; font-size: 16px;">${formattedDate}</span>
        </div>

        <div style="margin-bottom: 15px;">
          <strong style="color: #666; display: block; font-size: 14px; margin-bottom: 5px;">Uhrzeit:</strong>
          <span style="color: #1a1a2e; font-size: 16px;">${startTime} - ${endTime} Uhr</span>
        </div>

        <div style="margin-bottom: 15px;">
          <strong style="color: #666; display: block; font-size: 14px; margin-bottom: 5px;">Dauer:</strong>
          <span style="color: #1a1a2e; font-size: 16px;">${duration} Minuten</span>
        </div>

        ${booking.meeting_link ? `
        <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
          <strong style="color: #666; display: block; font-size: 14px; margin-bottom: 10px;">🎥 Meeting-Link:</strong>
          <a href="${booking.meeting_link}" style="display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #D4AF37 0%, #FFD700 100%); color: #1a1a2e; text-decoration: none; font-weight: bold; font-size: 16px; border-radius: 50px; margin-top: 10px;">
            Zum Meeting
          </a>
        </div>
        ` : ''}
      </div>

      ${reminderType === '24h' ? `
      <div style="background: #e8f5e9; border: 2px solid #4caf50; padding: 20px; margin: 30px 0; border-radius: 8px;">
        <p style="color: #2e7d32; font-size: 16px; margin: 0 0 10px 0; font-weight: bold;">
          💡 Tipp zur Vorbereitung
        </p>
        <p style="color: #2e7d32; font-size: 14px; margin: 0;">
          Nimm dir einen Moment Zeit, um dir zu überlegen, was du aus unserem Gespräch mitnehmen möchtest.
          Bereite gerne Fragen vor oder notiere dir Themen, die du besprechen möchtest.
        </p>
      </div>
      ` : ''}

      ${reminderType === '3h' ? `
      <div style="background: #fff3cd; border: 2px solid #ffc107; padding: 20px; margin: 30px 0; border-radius: 8px;">
        <p style="color: #856404; font-size: 16px; margin: 0 0 10px 0; font-weight: bold;">
          ⚡ Gleich geht's los!
        </p>
        <p style="color: #856404; font-size: 14px; margin: 0;">
          Stelle sicher, dass du in einer ruhigen Umgebung bist und deine Internetverbindung stabil ist.
          Ich freue mich auf unser Gespräch!
        </p>
      </div>
      ` : ''}

      ${booking.notes ? `
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
        <strong style="color: #666; display: block; font-size: 14px; margin-bottom: 10px;">Deine Notiz zur Buchung:</strong>
        <p style="color: #2c3e50; font-size: 14px; margin: 0; font-style: italic;">
          "${booking.notes}"
        </p>
      </div>
      ` : ''}

      <p style="color: #2c3e50; font-size: 16px; line-height: 1.6; margin: 30px 0 0 0;">
        Bei Fragen oder falls du den Termin kurzfristig absagen musst, melde dich bitte schnellstmöglich per E-Mail.
      </p>

      <p style="color: #2c3e50; font-size: 16px; line-height: 1.6; margin: 20px 0 0 0;">
        Bis gleich! 🌟
      </p>

      <p style="color: #2c3e50; font-size: 16px; margin: 10px 0 0 0;">
        Herzliche Grüße,<br>
        <strong>Claudia Conen</strong>
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
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: 'Claudia Conen <noreply@claudiaconen.com>',
        to: [booking.customer_email],
        subject: `${emojiIcon} Erinnerung: ${booking.appointment_type.name} ${reminderType === '24h' ? 'morgen' : 'heute'} um ${startTime} Uhr`,
        html: emailHtml,
      }),
    });

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text();
      return { success: false, errorMessage: errorText };
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      errorMessage: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    if (!RESEND_API_KEY) {
      throw new Error('E-Mail-Service nicht konfiguriert');
    }

    const now = new Date();
    const in24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const in3Hours = new Date(now.getTime() + 3 * 60 * 60 * 1000);

    const { data: bookings24h, error: error24h } = await supabase
      .from('bookings')
      .select(`
        *,
        appointment_type:appointment_types(*)
      `)
      .eq('status', 'confirmed')
      .eq('reminder_24h_sent', false)
      .gte('appointment_date', now.toISOString().split('T')[0])
      .lte('appointment_date', in24Hours.toISOString().split('T')[0]);

    const { data: bookings3h, error: error3h } = await supabase
      .from('bookings')
      .select(`
        *,
        appointment_type:appointment_types(*)
      `)
      .eq('status', 'confirmed')
      .eq('reminder_3h_sent', false)
      .eq('appointment_date', now.toISOString().split('T')[0]);

    if (error24h || error3h) {
      throw new Error('Fehler beim Abrufen der Buchungen');
    }

    const results = {
      reminders24h: { sent: 0, failed: 0 },
      reminders3h: { sent: 0, failed: 0 },
    };

    if (bookings24h && bookings24h.length > 0) {
      for (const booking of bookings24h) {
        const appointmentDateTime = new Date(`${booking.appointment_date}T${booking.start_time}`);
        const timeDiff = appointmentDateTime.getTime() - now.getTime();
        const hoursDiff = timeDiff / (1000 * 60 * 60);

        if (hoursDiff >= 23 && hoursDiff <= 25) {
          const result = await sendReminderEmail(booking, '24h', RESEND_API_KEY);

          await supabase
            .from('booking_email_logs')
            .insert({
              booking_id: booking.id,
              email_type: 'reminder_24h',
              recipient_email: booking.customer_email,
              success: result.success,
              error_message: result.errorMessage,
            });

          if (result.success) {
            await supabase
              .from('bookings')
              .update({
                reminder_24h_sent: true,
                reminder_24h_sent_at: now.toISOString(),
              })
              .eq('id', booking.id);

            results.reminders24h.sent++;
          } else {
            results.reminders24h.failed++;
          }
        }
      }
    }

    if (bookings3h && bookings3h.length > 0) {
      for (const booking of bookings3h) {
        const appointmentDateTime = new Date(`${booking.appointment_date}T${booking.start_time}`);
        const timeDiff = appointmentDateTime.getTime() - now.getTime();
        const hoursDiff = timeDiff / (1000 * 60 * 60);

        if (hoursDiff >= 2.5 && hoursDiff <= 3.5) {
          const result = await sendReminderEmail(booking, '3h', RESEND_API_KEY);

          await supabase
            .from('booking_email_logs')
            .insert({
              booking_id: booking.id,
              email_type: 'reminder_3h',
              recipient_email: booking.customer_email,
              success: result.success,
              error_message: result.errorMessage,
            });

          if (result.success) {
            await supabase
              .from('bookings')
              .update({
                reminder_3h_sent: true,
                reminder_3h_sent_at: now.toISOString(),
              })
              .eq('id', booking.id);

            results.reminders3h.sent++;
          } else {
            results.reminders3h.failed++;
          }
        }
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Erinnerungen verarbeitet',
        results,
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
    console.error('Error in send-booking-reminders:', error);

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
