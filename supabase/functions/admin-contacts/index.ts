import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as jose from "npm:jose@5";

// admin-contacts — sicheres Laden, Hinzufügen und Löschen von Kontakt-/Registrierungs-Listen
// im Admin-Dashboard der Hauptseite. Prüft das Admin-Login (gleicher JWT wie admin-module-operations)
// und arbeitet dann mit dem Server-Schlüssel. Nur die unten gelisteten Tabellen sind erlaubt.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const JWT_SECRET = Deno.env.get("JWT_SECRET") || "your-secret-key-change-in-production";

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

// Baut aus E-Mail + Name die nötigen Pflichtfelder je Liste (sinnvolle Platzhalter, damit der
// Eintrag angelegt werden kann). listKey unterscheidet die Unterlisten von contact_inquiries.
function buildInsert(table: string, email: string, first: string, last: string, listKey: string) {
  const full = [first, last].filter(Boolean).join(" ") || email;
  switch (table) {
    case "contact_inquiries": {
      let message = "Manuell im Admin hinzugefügt";
      if (listKey === "challenge") message = "7-TAGE-CHALLENGE – manuell im Admin hinzugefügt";
      else if (listKey === "powerofai") message = "POWER-OF-AI CHECK-IN – manuell im Admin hinzugefügt";
      return { name: full, email, message };
    }
    case "advent_registrations":
      return { email, first_name: first || full };
    case "checklist_downloads":
      return { email, article_slug: "manuell", article_title: "Manuell hinzugefügt" };
    case "linkedin_freebie_leads":
      return { email, source: "manuell" };
    case "coaching_inquiries":
      return { first_name: first || full, last_name: last || "-", email };
    case "abkuerzung_bookings":
      return { first_name: first || full, last_name: last || "-", email, package_type: "manuell", price_paid: 0 };
    case "beta_waitlist":
      return { first_name: first || full, last_name: last || "-", email };
    case "ki_manager_bookings":
      return { vorname: first || full, name: last || "-", adresse: "-", email, telefon: "-", selected_package: "manuell" };
    default:
      return null;
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

  let body: { action?: string; table?: string; id?: string; ids?: string[]; email?: string; firstName?: string; lastName?: string; listKey?: string };
  try { body = await req.json(); } catch { return json(400, { error: "Ungültige Anfrage." }); }

  const table = String(body.table || "");
  if (!ALLOWED.has(table)) return json(400, { error: "Diese Liste ist nicht erlaubt." });

  if (body.action === "list") {
    const { data, error } = await supabase.from(table).select("*").order("created_at", { ascending: false });
    if (error) return json(500, { error: error.message });
    return json(200, { data });
  }

  if (body.action === "add") {
    const email = String(body.email || "").trim();
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return json(400, { error: "Bitte eine gültige E-Mail angeben." });
    const values = buildInsert(table, email, String(body.firstName || "").trim(), String(body.lastName || "").trim(), String(body.listKey || ""));
    if (!values) return json(400, { error: "Diese Liste ist nicht erlaubt." });
    const { data, error } = await supabase.from(table).insert(values).select().single();
    if (error) return json(500, { error: error.message });
    return json(200, { data });
  }

  if (body.action === "delete") {
    const ids = Array.isArray(body.ids) ? body.ids : (body.id ? [body.id] : []);
    if (!ids.length) return json(400, { error: "Keine ID angegeben." });
    const { error } = await supabase.from(table).delete().in("id", ids);
    if (error) return json(500, { error: error.message });
    return json(200, { ok: true, deleted: ids.length });
  }

  return json(400, { error: "Unbekannte Aktion." });
});
