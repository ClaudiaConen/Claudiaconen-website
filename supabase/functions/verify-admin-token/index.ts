import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as jose from "npm:jose@5";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey, X-Admin-Token",
};

const JWT_SECRET = Deno.env.get("JWT_SECRET") || "your-secret-key-change-in-production";

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    let token: string | null = null;

    const adminTokenHeader = req.headers.get("X-Admin-Token");
    if (adminTokenHeader) {
      token = adminTokenHeader;
    }

    if (!token) {
      try {
        const body = await req.json();
        token = body.token;
      } catch {
      }
    }

    if (!token) {
      return new Response(
        JSON.stringify({ error: "Missing admin token" }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const secret = new TextEncoder().encode(JWT_SECRET);

    let payload;
    try {
      const result = await jose.jwtVerify(token, secret);
      payload = result.payload;
    } catch (error) {
      console.error("Token verification failed:", error);
      return new Response(
        JSON.stringify({ error: "Invalid or expired token" }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    const { data: adminUser, error: fetchError } = await supabase
      .from("admin_users")
      .select("id, email, name, is_active, role, allowed_sections")
      .eq("id", payload.sub)
      .maybeSingle();

    if (fetchError || !adminUser) {
      return new Response(
        JSON.stringify({ error: "Admin user not found" }),
        {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (!adminUser.is_active) {
      return new Response(
        JSON.stringify({ error: "Admin account is deactivated" }),
        {
          status: 403,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({
        valid: true,
        admin: {
          id: adminUser.id,
          email: adminUser.email,
          name: adminUser.name,
          role: adminUser.role || 'viewer',
          allowed_sections: adminUser.allowed_sections || [],
        },
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Token verification error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
