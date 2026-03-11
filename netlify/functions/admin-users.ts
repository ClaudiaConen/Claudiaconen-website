import type { Handler, HandlerEvent } from "@netlify/functions";

const SUPABASE_URL = process.env.VITE_SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

async function verifyAdminToken(authHeader: string | null): Promise<string> {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Missing or invalid authorization header");
  }

  const token = authHeader.substring(7);
  const parts = token.split(".");
  if (parts.length !== 3) throw new Error("Invalid token format");

  const [headerB64, payloadB64, signatureB64] = parts;

  // Verify signature using Web Crypto API
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(JWT_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"]
  );

  // Decode base64url signature
  const signatureStr = signatureB64.replace(/-/g, "+").replace(/_/g, "/");
  const signaturePadded = signatureStr + "=".repeat((4 - (signatureStr.length % 4)) % 4);
  const signatureBytes = Uint8Array.from(atob(signaturePadded), (c) => c.charCodeAt(0));

  const isValid = await crypto.subtle.verify(
    "HMAC",
    key,
    signatureBytes,
    encoder.encode(`${headerB64}.${payloadB64}`)
  );

  if (!isValid) throw new Error("Invalid token signature");

  // Decode payload
  const payloadStr = payloadB64.replace(/-/g, "+").replace(/_/g, "/");
  const payloadPadded = payloadStr + "=".repeat((4 - (payloadStr.length % 4)) % 4);
  const payload = JSON.parse(atob(payloadPadded));

  if (!payload.sub) throw new Error("Invalid token payload");
  if (payload.exp && payload.exp < Date.now() / 1000) throw new Error("Token expired");

  return payload.sub as string;
}

async function supabaseRequest(method: string, path: string, body?: object) {
  const url = `${SUPABASE_URL}/rest/v1/${path}`;
  const headers: Record<string, string> = {
    apikey: SUPABASE_SERVICE_ROLE_KEY,
    Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
    "Content-Type": "application/json",
    Prefer: "return=representation",
  };

  const options: RequestInit = { method, headers };
  if (body) options.body = JSON.stringify(body);

  const response = await fetch(url, options);
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Supabase error: ${error}`);
  }
  return response.json();
}

// Simple bcrypt-like hash using Web Crypto (for password updates)
// We use the same bcryptjs format as the Edge Function
async function hashPassword(password: string): Promise<string> {
  // Use dynamic import for bcryptjs in Node.js environment
  const bcrypt = await import("bcryptjs");
  return bcrypt.hashSync(password, 10);
}

const handler: Handler = async (event: HandlerEvent) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers: corsHeaders, body: "" };
  }

  if (!SUPABASE_SERVICE_ROLE_KEY) {
    return {
      statusCode: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Server configuration error: missing service role key" }),
    };
  }

  try {
    const currentAdminId = await verifyAdminToken(event.headers.authorization || event.headers.Authorization || null);

    const params = event.queryStringParameters || {};
    const action = params.action;

    // UPDATE admin user
    if (action === "update") {
      const { id, name, email, password } = JSON.parse(event.body || "{}");

      if (!id) {
        return {
          statusCode: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          body: JSON.stringify({ error: "Admin ID is required" }),
        };
      }

      const updateFields: Record<string, string> = {};
      if (name) updateFields.name = name;
      if (email) updateFields.email = email.toLowerCase().trim();
      if (password) {
        if (password.length < 8) {
          return {
            statusCode: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            body: JSON.stringify({ error: "Password must be at least 8 characters" }),
          };
        }
        updateFields.password_hash = await hashPassword(password);
      }

      if (Object.keys(updateFields).length === 0) {
        return {
          statusCode: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          body: JSON.stringify({ error: "No fields to update" }),
        };
      }

      // Check for duplicate email
      if (email) {
        const existing = await supabaseRequest(
          "GET",
          `admin_users?email=eq.${encodeURIComponent(email.toLowerCase().trim())}&id=neq.${id}&select=id`
        );
        if (existing.length > 0) {
          return {
            statusCode: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            body: JSON.stringify({ error: "An admin with this email already exists" }),
          };
        }
      }

      const result = await supabaseRequest(
        "PATCH",
        `admin_users?id=eq.${id}&select=id,email,name,is_active,created_at,last_login_at`,
        updateFields
      );

      return {
        statusCode: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        body: JSON.stringify({ admin: result[0] }),
      };
    }

    // DELETE admin user
    if (action === "delete") {
      const { id } = JSON.parse(event.body || "{}");

      if (!id) {
        return {
          statusCode: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          body: JSON.stringify({ error: "Admin ID is required" }),
        };
      }

      if (id === currentAdminId) {
        return {
          statusCode: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          body: JSON.stringify({ error: "You cannot delete your own account" }),
        };
      }

      await supabaseRequest("DELETE", `admin_users?id=eq.${id}`);

      return {
        statusCode: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        body: JSON.stringify({ success: true }),
      };
    }

    return {
      statusCode: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Invalid action. Supported: update, delete" }),
    };
  } catch (error) {
    console.error("Admin users function error:", error);
    return {
      statusCode: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({
        error: error instanceof Error ? error.message : "Internal server error",
      }),
    };
  }
};

export { handler };
