import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import bcryptjs from "npm:bcryptjs@2.4.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ResetPasswordRequest {
  token: string;
  newPassword: string;
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

    const { token, newPassword }: ResetPasswordRequest = await req.json();

    if (!token || !newPassword) {
      return new Response(
        JSON.stringify({ error: "Token and new password are required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (newPassword.length < 8) {
      return new Response(
        JSON.stringify({ error: "Password must be at least 8 characters long" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const { data: resetRecord, error: fetchError } = await supabase
      .from("admin_password_resets")
      .select("*, admin_users!inner(id, email, name)")
      .eq("token", token)
      .maybeSingle();

    if (fetchError || !resetRecord) {
      return new Response(
        JSON.stringify({ error: "Invalid or expired reset token" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (resetRecord.used_at) {
      return new Response(
        JSON.stringify({ error: "This reset link has already been used" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const expiresAt = new Date(resetRecord.expires_at);
    if (expiresAt < new Date()) {
      return new Response(
        JSON.stringify({ error: "Reset token has expired" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const passwordHash = bcryptjs.hashSync(newPassword, 10);

    const { error: updateError } = await supabase
      .from("admin_users")
      .update({ password_hash: passwordHash })
      .eq("id", resetRecord.admin_user_id);

    if (updateError) {
      console.error("Error updating password:", updateError);
      throw updateError;
    }

    const { error: markUsedError } = await supabase
      .from("admin_password_resets")
      .update({ used_at: new Date().toISOString() })
      .eq("id", resetRecord.id);

    if (markUsedError) {
      console.error("Error marking token as used:", markUsedError);
    }

    return new Response(
      JSON.stringify({
        message: "Password has been successfully reset. You can now log in with your new password."
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Password reset error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
