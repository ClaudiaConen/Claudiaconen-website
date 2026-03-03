import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

interface PasswordResetRequest {
  email: string;
}

function generateSecureToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    const { email }: PasswordResetRequest = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const { data: adminUser, error: fetchError } = await supabase
      .from("admin_users")
      .select("id, email, name")
      .eq("email", email.toLowerCase().trim())
      .maybeSingle();

    if (fetchError || !adminUser) {
      return new Response(
        JSON.stringify({
          message: "If an account with that email exists, a password reset link has been sent."
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const token = generateSecureToken();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const { error: insertError } = await supabase
      .from("admin_password_resets")
      .insert({
        admin_user_id: adminUser.id,
        token,
        expires_at: expiresAt.toISOString(),
      });

    if (insertError) {
      console.error("Error creating password reset:", insertError);
      throw insertError;
    }

    const resetUrl = `https://claudiaconen-akademie.de/admin/passwort-zuruecksetzen?token=${token}`;

    if (RESEND_API_KEY) {
      try {
        const resendResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: "Claudia Conen Akademie <noreply@claudiaconen-akademie.de>",
            to: [adminUser.email],
            subject: "Admin Passwort zurücksetzen",
            html: `
              <!DOCTYPE html>
              <html>
                <head>
                  <meta charset="UTF-8">
                  <style>
                    body {
                      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                      line-height: 1.6;
                      color: #333;
                      max-width: 600px;
                      margin: 0 auto;
                      padding: 20px;
                    }
                    .container {
                      background: #ffffff;
                      border-radius: 8px;
                      padding: 30px;
                      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    }
                    .header {
                      text-align: center;
                      margin-bottom: 30px;
                    }
                    h1 {
                      color: #1a1a1a;
                      font-size: 24px;
                      margin-bottom: 10px;
                    }
                    .button {
                      display: inline-block;
                      background: #0066cc;
                      color: #ffffff !important;
                      text-decoration: none;
                      padding: 12px 30px;
                      border-radius: 6px;
                      font-weight: 600;
                      margin: 20px 0;
                    }
                    .footer {
                      margin-top: 30px;
                      padding-top: 20px;
                      border-top: 1px solid #eeeeee;
                      font-size: 14px;
                      color: #666;
                    }
                    .warning {
                      background: #fff3cd;
                      border: 1px solid #ffc107;
                      border-radius: 4px;
                      padding: 15px;
                      margin: 20px 0;
                    }
                  </style>
                </head>
                <body>
                  <div class="container">
                    <div class="header">
                      <h1>Passwort zurücksetzen</h1>
                    </div>

                    <p>Hallo ${adminUser.name},</p>

                    <p>Sie haben angefordert, Ihr Admin-Passwort zurückzusetzen. Klicken Sie auf den Button unten, um ein neues Passwort festzulegen:</p>

                    <div style="text-align: center;">
                      <a href="${resetUrl}" class="button">Passwort zurücksetzen</a>
                    </div>

                    <div class="warning">
                      <strong>⚠️ Wichtig:</strong> Dieser Link ist 24 Stunden gültig und kann nur einmal verwendet werden.
                    </div>

                    <p>Falls der Button nicht funktioniert, kopieren Sie bitte diesen Link in Ihren Browser:</p>
                    <p style="word-break: break-all; color: #0066cc;">${resetUrl}</p>

                    <div class="footer">
                      <p><strong>Sie haben diese Anfrage nicht gestellt?</strong></p>
                      <p>Ignorieren Sie diese E-Mail einfach. Ihr Passwort bleibt unverändert.</p>
                    </div>
                  </div>
                </body>
              </html>
            `,
          }),
        });

        if (!resendResponse.ok) {
          const errorData = await resendResponse.json();
          console.error("Resend API error:", errorData);
        }
      } catch (emailError) {
        console.error("Error sending email:", emailError);
      }
    }

    return new Response(
      JSON.stringify({
        message: "If an account with that email exists, a password reset link has been sent."
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Password reset request error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
