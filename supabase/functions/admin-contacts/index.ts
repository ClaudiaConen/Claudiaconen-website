import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as jose from "npm:jose@5";

// admin-contacts — sicheres Laden, Zählen, Hinzufügen und Löschen der Kontakt-/Registrierungs-Listen
// im Admin-Dashboard der Hauptseite. Die Tabellen sind per RLS geschützt (nur "authenticated" darf lesen),
// das Admin-Login läuft aber über ein eigenes JWT. Darum prüft diese Funktion das Admin-Login und arbeitet
// danach mit dem Server-Schlüssel (umgeht RLS sauber). Nur die unten gelisteten Tabellen sind erlaubt.

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

// Kategorie-Filter für die drei Unterlisten von contact_inquiries (identisch zur Admin-Ansicht).
function applyListKeyFilter(q: any, listKey: string) {
  if (listKey === "challenge") return q.or("message.ilike.*CHALLENGE*,message.ilike.*Video-Training ab 26.10.*: ja*");
  if (listKey === "powerofai") return q.ilike("message", "%POWER-OF-AI CHECK-IN%");
  if (listKey === "contactInquiries") return q.not("message", "ilike", "%CHALLENGE%").not("message", "ilike", "%POWER-OF-AI CHECK-IN%");
  return q;
}

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

// Zählt alle Listen des Dashboards in einem Aufruf (Schlüssel wie im Dashboard).
async function allCounts(supabase: any) {
  const countTable = async (t: string, apply?: (q: any) => any) => {
    try {
      let q = supabase.from(t).select("*", { count: "exact", head: true });
      if (apply) q = apply(q);
      const { count } = await q;
      return count || 0;
    } catch {
      return 0;
    }
  };
  const [challenge, powerofai, contactInquiries, adventRegistrations, checklistDownloads, linkedinFreebie, coachingInquiries, abkuerzungBookings, betaWaitlist, kiManagerBookings] = await Promise.all([
    countTable("contact_inquiries", (q) => applyListKeyFilter(q, "challenge")),
    countTable("contact_inquiries", (q) => applyListKeyFilter(q, "powerofai")),
    countTable("contact_inquiries", (q) => applyListKeyFilter(q, "contactInquiries")),
    countTable("advent_registrations"),
    countTable("checklist_downloads"),
    countTable("linkedin_freebie_leads"),
    countTable("coaching_inquiries"),
    countTable("abkuerzung_bookings"),
    countTable("beta_waitlist"),
    countTable("ki_manager_bookings"),
  ]);
  return { challenge, powerofai, contactInquiries, adventRegistrations, checklistDownloads, linkedinFreebie, coachingInquiries, abkuerzungBookings, betaWaitlist, kiManagerBookings };
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

  // Alle Zähler auf einmal
  if (body.action === "counts") {
    return json(200, { counts: await allCounts(supabase) });
  }

  const table = String(body.table || "");
  if (!ALLOWED.has(table)) return json(400, { error: "Diese Liste ist nicht erlaubt." });
  const listKey = String(body.listKey || "");

  if (body.action === "list") {
    let q = supabase.from(table).select("*").order("created_at", { ascending: false });
    if (table === "contact_inquiries") q = applyListKeyFilter(q, listKey);
    const { data, error } = await q;
    if (error) return json(500, { error: error.message });
    return json(200, { data });
  }

  if (body.action === "add") {
    const email = String(body.email || "").trim();
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return json(400, { error: "Bitte eine gültige E-Mail angeben." });
    const values = buildInsert(table, email, String(body.firstName || "").trim(), String(body.lastName || "").trim(), listKey);
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
