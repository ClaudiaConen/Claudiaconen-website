import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as jose from "npm:jose@5";

// admin-contacts — sicheres Löschen (und optionales Laden) von Kontakt-/Registrierungs-Listen
// im Admin-Dashboard der Hauptseite. Prüft das Admin-Login (gleicher JWT wie admin-module-operations)
// und arbeitet dann mit dem Server-Schlüssel. Nur die unten gelisteten Tabellen sind erlaubt.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const JWT_SECRET = Deno.env.get("JWT_SECRET") || "your-secret-key-change-in-production";

// Nur diese Tabellen dürfen über diese Funktion gelesen/gelöscht werden (die E-Mail-Listen).
const ALLOWED = new Set([
  "contact_inquiries",
  "advent_registrations",
  "checklist_downloads",
  "linkedin_freebie_leads",
  "coaching_inquiries",
  "abkuerzung_bookings",
  "beta_waitlist",
  "ki_manager_bookings",
]);

async function verifyAdmin(req: Request, supabase: any) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return { error: "Missing or invalid authorization header", status: 401 };
  }
  const token = authHeader.replace("Bearer ", "");
  try {
    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jose.jwtVerify(token, secret);
    const { data: adminUser } = await supabase
      .from("admin_users")
      .select("is_active")
      .eq("email", payload.email as string)
      .maybeSingle();
    if (!adminUser || !adminUser.is_active) {
      return { error: "Admin not active or not found", status: 403 };
    }
    return { payload };
  } catch {
    return { error: "Invalid or expired token", status: 401 };
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 200, headers: corsHeaders });
  const json = (status: number, body: unknown) =>
    new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

  if (req.method !== "POST") return json(405, { error: "Nur POST erlaubt." });

  const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

  const auth = await verifyAdmin(req, supabase);
  if ((auth as any).error) return json((auth as any).status, { error: (auth as any).error });

  let body: { action?: string; table?: string; id?: string; ids?: string[] };
  try { body = await req.json(); } catch { return json(400, { error: "Ungültige Anfrage." }); }

  const table = String(body.table || "");
  if (!ALLOWED.has(table)) return json(400, { error: "Diese Liste ist nicht erlaubt." });

  // Alle Einträge einer Liste laden (zum Verwalten/Duplikate finden)
  if (body.action === "list") {
    const { data, error } = await supabase.from(table).select("*").order("created_at", { ascending: false });
    if (error) return json(500, { error: error.message });
    return json(200, { data });
  }

  // Einen oder mehrere Einträge löschen
  if (body.action === "delete") {
    const ids = Array.isArray(body.ids) ? body.ids : (body.id ? [body.id] : []);
    if (!ids.length) return json(400, { error: "Keine ID angegeben." });
    const { error } = await supabase.from(table).delete().in("id", ids);
    if (error) return json(500, { error: error.message });
    return json(200, { ok: true, deleted: ids.length });
  }

  return json(400, { error: "Unbekannte Aktion." });
});
