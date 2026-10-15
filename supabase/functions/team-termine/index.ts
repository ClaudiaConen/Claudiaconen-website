import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

/**
 * Geschuetzte Terminverwaltung fuer die gemeinsame Uebersicht (Claudia & Gabi).
 * Laeuft auf eamm und nutzt den automatisch bereitgestellten service_role-Schluessel,
 * um auf die PRIVATE Tabelle team_termine zuzugreifen (keine anon-Policies).
 * Vorher wird das Website-Admin-Login ueber die bestehende Pruef-Funktion auf szil validiert.
 * So sind Kundentermine NICHT mit dem oeffentlichen Schluessel auslesbar.
 */

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey, X-Admin-Token",
};

// Oeffentlicher anon-Schluessel + Pruef-Endpunkt der bestehenden Admin-Login-DB (szil).
const VERIFY_URL = "https://szilqjmcqdydwwtitxyb.supabase.co/functions/v1/verify-admin-token";
const VERIFY_ANON =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6aWxxam1jcWR5ZHd3dGl0eHliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1NDEzODYsImV4cCI6MjA3NjExNzM4Nn0.qTu_0iHZNnkAfgYyJzmqIAFl6Mk53Wv_5gnXXqfeOAo";

const FELDER = ["titel", "art", "start_am", "ende_am", "ganztags", "ort", "kunde", "wer", "notizen", "erstellt_von"];

function clean(obj: Record<string, unknown>) {
  const out: Record<string, unknown> = {};
  for (const k of FELDER) if (k in obj) out[k] = obj[k];
  return out;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 200, headers: corsHeaders });
  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

  try {
    const adminToken = req.headers.get("X-Admin-Token");
    if (!adminToken) return json({ error: "Nicht autorisiert" }, 401);

    // Admin-Login gegen die bestehende Pruef-Funktion validieren
    const vr = await fetch(VERIFY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": VERIFY_ANON,
        "Authorization": `Bearer ${VERIFY_ANON}`,
      },
      body: JSON.stringify({ token: adminToken }),
    });
    if (!vr.ok) return json({ error: "Nicht autorisiert" }, 401);
    const vj = await vr.json().catch(() => ({}));
    if (!vj?.valid) return json({ error: "Nicht autorisiert" }, 401);
    const adminName = vj?.admin?.name || vj?.admin?.email || "Admin";

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { auth: { autoRefreshToken: false, persistSession: false } },
    );

    const body = await req.json().catch(() => ({}));
    const action = body?.action || "list";

    if (action === "list") {
      let q = supabase.from("team_termine").select("*").order("start_am", { ascending: true });
      if (body?.from) q = q.gte("start_am", body.from);
      if (body?.to) q = q.lte("start_am", body.to);
      const { data, error } = await q;
      if (error) return json({ error: error.message }, 500);
      return json({ termine: data });
    }

    if (action === "create") {
      const row = clean(body?.termin || {});
      if (!row.titel || !row.start_am) return json({ error: "Titel und Datum sind Pflicht" }, 400);
      row.erstellt_von = adminName;
      const { data, error } = await supabase.from("team_termine").insert([row]).select().single();
      if (error) return json({ error: error.message }, 500);
      return json({ termin: data });
    }

    if (action === "update") {
      if (!body?.id) return json({ error: "id fehlt" }, 400);
      const row = clean(body?.termin || {});
      (row as Record<string, unknown>).updated_at = new Date().toISOString();
      const { data, error } = await supabase.from("team_termine").update(row).eq("id", body.id).select().single();
      if (error) return json({ error: error.message }, 500);
      return json({ termin: data });
    }

    if (action === "delete") {
      if (!body?.id) return json({ error: "id fehlt" }, 400);
      const { error } = await supabase.from("team_termine").delete().eq("id", body.id);
      if (error) return json({ error: error.message }, 500);
      return json({ ok: true });
    }

    return json({ error: "Unbekannte Aktion" }, 400);
  } catch (e) {
    return json({ error: String(e) }, 500);
  }
});
