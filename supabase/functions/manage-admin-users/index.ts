import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import bcryptjs from "npm:bcryptjs@2.4.3";
import * as jose from "npm:jose@5";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const JWT_SECRET = Deno.env.get("JWT_SECRET") || "your-secret-key-change-in-production";

interface CreateAdminRequest {
  email: string;
  name: string;
  password: string;
}

interface UpdateAdminRequest {
  id: string;
  is_active?: boolean;
}

async function verifyAdminToken(authHeader: string | null): Promise<string> {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Missing or invalid authorization header");
  }

  const token = authHeader.substring(7);

  const secret = new TextEncoder().encode(JWT_SECRET);
  const { payload } = await jose.jwtVerify(token, secret);

  if (!payload.sub) {
    throw new Error("Invalid token payload");
  }

  return payload.sub as string;
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

    await verifyAdminToken(req.headers.get("Authorization"));

    const url = new URL(req.url);
    const action = url.searchParams.get("action");

    if (req.method === "GET") {
      const { data: adminUsers, error } = await supabase
        .from("admin_users")
        .select("id, email, name, is_active, created_at, last_login_at")
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      return new Response(JSON.stringify({ adminUsers }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (req.method === "POST" && action === "create") {
      const { email, name, password }: CreateAdminRequest = await req.json();

      if (!email || !name || !password) {
        return new Response(
          JSON.stringify({ error: "Email, name, and password are required" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      if (password.length < 8) {
        return new Response(
          JSON.stringify({ error: "Password must be at least 8 characters" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      const { data: existingUser } = await supabase
        .from("admin_users")
        .select("id")
        .eq("email", email.toLowerCase().trim())
        .maybeSingle();

      if (existingUser) {
        return new Response(
          JSON.stringify({ error: "An admin with this email already exists" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      const passwordHash = bcryptjs.hashSync(password, 10);

      const { data: newAdmin, error: insertError } = await supabase
        .from("admin_users")
        .insert({
          email: email.toLowerCase().trim(),
          name,
          password_hash: passwordHash,
          is_active: true,
        })
        .select("id, email, name, is_active, created_at")
        .single();

      if (insertError) {
        throw insertError;
      }

      return new Response(JSON.stringify({ admin: newAdmin }), {
        status: 201,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (req.method === "PUT" && action === "toggle-active") {
      const { id, is_active }: UpdateAdminRequest = await req.json();

      if (!id || is_active === undefined) {
        return new Response(
          JSON.stringify({ error: "Admin ID and is_active status are required" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      const { data: updatedAdmin, error: updateError } = await supabase
        .from("admin_users")
        .update({ is_active })
        .eq("id", id)
        .select("id, email, name, is_active, created_at, last_login_at")
        .single();

      if (updateError) {
        throw updateError;
      }

      return new Response(JSON.stringify({ admin: updatedAdmin }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({ error: "Invalid request" }),
      {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Admin management error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Internal server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
