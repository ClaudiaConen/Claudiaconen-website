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

const VALID_ROLES = ['super_admin', 'admin', 'editor', 'viewer'] as const;
const VALID_SECTIONS = ['dashboard', 'kursverwaltung', 'terminverwaltung', 'inhalte', 'projektmanagement', 'verwaltung'] as const;

interface CreateAdminRequest {
  email: string;
  name: string;
  password: string;
  role?: string;
  allowed_sections?: string[];
}

interface UpdateAdminRequest {
  id: string;
  is_active?: boolean;
  name?: string;
  email?: string;
  password?: string;
  role?: string;
  allowed_sections?: string[];
}

interface VerifiedAdmin {
  id: string;
  role: string;
}

async function verifyAdminToken(authHeader: string | null): Promise<VerifiedAdmin> {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Missing or invalid authorization header");
  }

  const token = authHeader.substring(7);

  const secret = new TextEncoder().encode(JWT_SECRET);
  const { payload } = await jose.jwtVerify(token, secret);

  if (!payload.sub) {
    throw new Error("Invalid token payload");
  }

  return {
    id: payload.sub as string,
    role: (payload as Record<string, unknown>).role as string || 'viewer',
  };
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

    const currentAdmin = await verifyAdminToken(req.headers.get("Authorization"));
    const currentAdminId = currentAdmin.id;
    const currentAdminRole = currentAdmin.role;

    const url = new URL(req.url);
    const action = url.searchParams.get("action");

    if (req.method === "GET") {
      const { data: adminUsers, error } = await supabase
        .from("admin_users")
        .select("id, email, name, is_active, created_at, last_login_at, role, allowed_sections")
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
      const { email, name, password, role, allowed_sections }: CreateAdminRequest = await req.json();

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

      // Only super_admins can set roles
      const assignedRole = (currentAdminRole === 'super_admin' && role && VALID_ROLES.includes(role as typeof VALID_ROLES[number]))
        ? role : 'viewer';
      const assignedSections = (currentAdminRole === 'super_admin' && allowed_sections)
        ? allowed_sections.filter(s => VALID_SECTIONS.includes(s as typeof VALID_SECTIONS[number]))
        : [];

      const { data: existingUser } = await supabase
        .from("admin_users")
        .select("id, is_active")
        .eq("email", email.toLowerCase().trim())
        .maybeSingle();

      if (existingUser && existingUser.is_active) {
        return new Response(
          JSON.stringify({ error: "An admin with this email already exists" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      const passwordHash = bcryptjs.hashSync(password, 10);

      if (existingUser && !existingUser.is_active) {
        const { data: reactivatedAdmin, error: updateError } = await supabase
          .from("admin_users")
          .update({
            name,
            password_hash: passwordHash,
            is_active: true,
            role: assignedRole,
            allowed_sections: assignedSections,
          })
          .eq("id", existingUser.id)
          .select("id, email, name, is_active, created_at, role, allowed_sections")
          .single();

        if (updateError) {
          throw updateError;
        }

        return new Response(JSON.stringify({ admin: reactivatedAdmin }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const { data: newAdmin, error: insertError } = await supabase
        .from("admin_users")
        .insert({
          email: email.toLowerCase().trim(),
          name,
          password_hash: passwordHash,
          is_active: true,
          role: assignedRole,
          allowed_sections: assignedSections,
        })
        .select("id, email, name, is_active, created_at, role, allowed_sections")
        .single();

      if (insertError) {
        throw insertError;
      }

      return new Response(JSON.stringify({ admin: newAdmin }), {
        status: 201,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if ((req.method === "PUT" || req.method === "POST") && action === "update") {
      const { id, name, email, password, role, allowed_sections }: UpdateAdminRequest = await req.json();

      if (!id) {
        return new Response(
          JSON.stringify({ error: "Admin ID is required" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      const updateData: Record<string, unknown> = {};
      if (name) updateData.name = name;
      if (email) updateData.email = email.toLowerCase().trim();
      if (password) {
        if (password.length < 8) {
          return new Response(
            JSON.stringify({ error: "Password must be at least 8 characters" }),
            {
              status: 400,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
          );
        }
        updateData.password_hash = bcryptjs.hashSync(password, 10);
      }

      // Only super_admins can update roles and sections
      if (currentAdminRole === 'super_admin') {
        if (role !== undefined) {
          if (VALID_ROLES.includes(role as typeof VALID_ROLES[number])) {
            updateData.role = role;
          }
        }
        if (allowed_sections !== undefined) {
          updateData.allowed_sections = allowed_sections.filter(
            s => VALID_SECTIONS.includes(s as typeof VALID_SECTIONS[number])
          );
        }
      } else if (role !== undefined || allowed_sections !== undefined) {
        return new Response(
          JSON.stringify({ error: "Only Super-Admins can change roles and permissions" }),
          {
            status: 403,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      if (Object.keys(updateData).length === 0) {
        return new Response(
          JSON.stringify({ error: "No fields to update" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      if (email) {
        const { data: existingUser } = await supabase
          .from("admin_users")
          .select("id")
          .eq("email", email.toLowerCase().trim())
          .neq("id", id)
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
      }

      const { data: updatedAdmin, error: updateError } = await supabase
        .from("admin_users")
        .update(updateData)
        .eq("id", id)
        .select("id, email, name, is_active, created_at, last_login_at, role, allowed_sections")
        .single();

      if (updateError) {
        throw updateError;
      }

      return new Response(JSON.stringify({ admin: updatedAdmin }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if ((req.method === "DELETE" || req.method === "POST") && action === "delete") {
      const { id }: { id: string } = await req.json();

      if (!id) {
        return new Response(
          JSON.stringify({ error: "Admin ID is required" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      if (id === currentAdminId) {
        return new Response(
          JSON.stringify({ error: "You cannot delete your own account" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      const { error: deleteError } = await supabase
        .from("admin_users")
        .delete()
        .eq("id", id);

      if (deleteError) {
        throw deleteError;
      }

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if ((req.method === "PUT" || req.method === "POST") && action === "toggle-active") {
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
        .select("id, email, name, is_active, created_at, last_login_at, role, allowed_sections")
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
