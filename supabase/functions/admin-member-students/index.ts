import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as jose from "npm:jose@5";

// admin-member-students — (in Supabase deployt als "admin-member-student", ohne s) Teilnehmende des Mitgliederbereichs im Admin verwalten (16.11.2026).
// Das Admin-Login laeuft ueber ein eigenes JWT (wie bei admin-contacts), member_students ist per RLS nur fuer
// "authenticated" offen. Darum prueft diese Funktion das Admin-Login und arbeitet danach mit dem Server-Schluessel.
// Aktionen: list, create, delete, setActive, setCourse (Kurs-Freigabe pro Person, Tabelle member_student_course_access).
// Einrichten: Supabase-Dashboard -> Edge Functions -> neue Funktion "admin-member-students", diesen Code einfuegen,
// "Verify JWT" AUS (wie bei admin-contacts). JWT_SECRET ist als Projekt-Secret schon vorhanden.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const JWT_SECRET = Deno.env.get("JWT_SECRET") || "your-secret-key-change-in-production";

function json(status: number, body: unknown) {
  return new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
}

async function verifyAdmin(req: Request, supabase: any) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) return { error: "Bitte neu einloggen.", status: 401 };
  try {
    const { payload } = await jose.jwtVerify(authHeader.replace("Bearer ", ""), new TextEncoder().encode(JWT_SECRET));
    const { data: adminUser } = await supabase.from("admin_users").select("is_active").eq("email", payload.email as string).maybeSingle();
    if (!adminUser || !adminUser.is_active) return { error: "Kein aktiver Admin.", status: 403 };
    return { payload };
  } catch {
    return { error: "Anmeldung abgelaufen – bitte neu einloggen.", status: 401 };
  }
}

function zugangscode() {
  const zeichen = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const zufall = crypto.getRandomValues(new Uint8Array(8));
  return [...zufall].map((b) => zeichen[b % zeichen.length]).join("");
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 200, headers: corsHeaders });
  if (req.method !== "POST") return json(405, { error: "Nur POST erlaubt." });

  const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
  const auth = await verifyAdmin(req, supabase);
  if ((auth as any).error) return json((auth as any).status, { error: (auth as any).error });

  let body: any;
  try { body = await req.json(); } catch { return json(400, { error: "Ungültige Anfrage." }); }

  try {
    switch (body.action) {
      case "list": {
        const [{ data: students, error: e1 }, { data: courses }, freigabe] = await Promise.all([
          supabase.from("member_students").select("*").order("created_at", { ascending: false }),
          supabase.from("member_courses").select("id, title").order("order_index", { ascending: true }),
          supabase.from("member_student_course_access").select("student_id, course_id"),
        ]);
        if (e1) throw e1;
        return json(200, { students: students ?? [], courses: courses ?? [], access: freigabe.data ?? [], accessReady: !freigabe.error });
      }
      case "create": {
        const email = String(body.email || "").trim().toLowerCase();
        const first = String(body.firstName || "").trim();
        const last = String(body.lastName || "").trim();
        if (!email || !first || !last) return json(400, { error: "Vorname, Nachname und E-Mail sind Pflicht." });
        const { data: vorhanden } = await supabase.from("member_students").select("id").eq("email", email).maybeSingle();
        if (vorhanden) return json(409, { error: "Diese E-Mail-Adresse ist schon angelegt. Schalte den Kurs in der Liste frei." });
        const code = String(body.accessCode || "").trim().toUpperCase() || zugangscode();
        const { data: neu, error } = await supabase.from("member_students").insert({
          email, first_name: first, last_name: last, access_code: code,
          level: 1, total_xp: 0, current_streak: 0, is_active: true,
        }).select("id").single();
        if (error) throw error;
        const kurse: string[] = Array.isArray(body.courseIds) ? body.courseIds : [];
        if (kurse.length) {
          const { error: e2 } = await supabase.from("member_student_course_access")
            .insert(kurse.map((course_id) => ({ student_id: neu.id, course_id })));
          if (e2) return json(500, { error: "Teilnehmerin angelegt, aber Kurs-Freigabe fehlgeschlagen: " + e2.message });
        }
        return json(200, { id: neu.id });
      }
      case "delete": {
        const { error } = await supabase.from("member_students").delete().eq("id", String(body.id));
        if (error) throw error;
        return json(200, { ok: true });
      }
      case "setActive": {
        const { error } = await supabase.from("member_students").update({ is_active: !!body.active }).eq("id", String(body.id));
        if (error) throw error;
        return json(200, { ok: true });
      }
      case "setCourse": {
        const sid = String(body.studentId), cid = String(body.courseId);
        const { error } = body.on
          ? await supabase.from("member_student_course_access").upsert({ student_id: sid, course_id: cid })
          : await supabase.from("member_student_course_access").delete().eq("student_id", sid).eq("course_id", cid);
        if (error) throw error;
        return json(200, { ok: true });
      }
      default:
        return json(400, { error: "Unbekannte Aktion." });
    }
  } catch (err: any) {
    return json(500, { error: err?.message || "Datenbankfehler." });
  }
});
