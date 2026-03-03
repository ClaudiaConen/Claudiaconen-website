import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface BookingConfirmationRequest {
  bookingId: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { bookingId }: BookingConfirmationRequest = await req.json();

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .select(`
        *,
        appointment_type:appointment_types(*)
      `)
      .eq('id', bookingId)
      .single();

    if (bookingError || !booking) {
      throw new Error('Buchung nicht gefunden');
    }

    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    if (!RESEND_API_KEY) {
      throw new Error('E-Mail-Service nicht konfiguriert');
    }

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
    const price = parseFloat(booking.appointment_type.price);
    const isPaid = price > 0;

    const emailHtml = `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Buchungsbestätigung</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f7fa;">
  <div style="max-width: 600px; margin: 40px auto; background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.15);">
    <div style="background: linear-gradient(135deg, #D4AF37 0%, #FFD700 100%); padding: 40px; text-align: center;">
      <h1 style="color: #1a1a2e; font-size: 28px; margin: 0 0 10px 0;">✅ Buchung bestätigt!</h1>
      <p style="color: #1a1a2e; font-size: 16px; margin: 0;">Dein Termin wurde erfolgreich gebucht</p>
    </div>

    <div style="padding: 40px;">
      <p style="color: #1a1a2e; font-size: 18px; line-height: 1.6; margin: 0 0 20px 0; font-weight: bold;">
        Hallo ${booking.customer_name},
      </p>

      <p style="color: #2c3e50; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
        vielen Dank für deine Buchung! Ich freue mich sehr auf unser gemeinsames Gespräch.
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
          <a href="${booking.meeting_link}" style="color: #D4AF37; font-size: 16px; word-break: break-all;">${booking.meeting_link}</a>
        </div>
        ` : ''}
      </div>

      ${isPaid && booking.payment_status === 'pending' ? `
      <div style="background: #fff3cd; border: 2px solid #ffc107; padding: 20px; margin: 30px 0; border-radius: 8px;">
        <p style="color: #856404; font-size: 16px; margin: 0 0 10px 0; font-weight: bold;">
          ⚠️ Zahlung ausstehend
        </p>
        <p style="color: #856404; font-size: 14px; margin: 0;">
          Bitte schließe die Zahlung ab, um deinen Termin zu bestätigen.
        </p>
      </div>
      ` : ''}

      <p style="color: #2c3e50; font-size: 16px; line-height: 1.6; margin: 30px 0 0 0;">
        Du erhältst automatisch Erinnerungen:
      </p>

      <ul style="color: #2c3e50; font-size: 16px; line-height: 1.8; margin: 10px 0 30px 20px;">
        <li>24 Stunden vor dem Termin</li>
        <li>3 Stunden vor dem Termin</li>
      </ul>

      ${booking.notes ? `
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
        <strong style="color: #666; display: block; font-size: 14px; margin-bottom: 10px;">Deine Notiz:</strong>
        <p style="color: #2c3e50; font-size: 14px; margin: 0; font-style: italic;">
          "${booking.notes}"
        </p>
      </div>
      ` : ''}

      <p style="color: #2c3e50; font-size: 16px; line-height: 1.6; margin: 30px 0 0 0;">
        Bei Fragen oder falls du den Termin verschieben musst, melde dich gerne per E-Mail.
      </p>

      <p style="color: #2c3e50; font-size: 16px; line-height: 1.6; margin: 20px 0 0 0;">
        Ich freue mich auf dich! 🌟
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

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Claudia Conen <noreply@claudiaconen.com>',
        to: [booking.customer_email],
        subject: `Buchungsbestätigung: ${booking.appointment_type.name} am ${formattedDate}`,
        html: emailHtml,
      }),
    });

    const success = resendResponse.ok;
    const resendData = success ? await resendResponse.json() : null;
    const errorMessage = success ? null : await resendResponse.text();

    await supabase
      .from('booking_email_logs')
      .insert({
        booking_id: bookingId,
        email_type: 'confirmation',
        recipient_email: booking.customer_email,
        success,
        error_message: errorMessage,
      });

    if (!success) {
      throw new Error('E-Mail konnte nicht versendet werden');
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Bestätigungs-E-Mail wurde versendet',
        emailId: resendData?.id,
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
    console.error('Error in send-booking-confirmation:', error);

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
