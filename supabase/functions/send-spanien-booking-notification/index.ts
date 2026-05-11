import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

// Empfänger der Buchungs-Benachrichtigung
const ADMIN_RECIPIENT = "claudiaconen@umsatzstimme.de";

// Absender (Domain muss bei Resend verifiziert sein — claudiaconen.com ist es laut RESEND_SETUP)
const FROM_ADDRESS = "Spanien KI-Workshop <noreply@claudiaconen.com>";

interface BookingPayload {
  vorname: string;
  nachname: string;
  email: string;
  telefon?: string | null;
  firma?: string | null;
  strasse: string;
  plz: string;
  ort: string;
  land: string;
  ustIdNr?: string | null;
  nachricht?: string | null;
  totalPriceNetto: number;
  agbAccepted: boolean;
  privacyAccepted: boolean;
}

function escapeHtml(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function sanitizeKey(raw: string): string {
  return raw.replace(/[^\x21-\x7E]/g, "");
}

async function sendResendEmail(opts: {
  apiKey: string;
  to: string[];
  replyTo?: string;
  subject: string;
  html: string;
  text: string;
}): Promise<{ ok: boolean; id?: string | null; error?: string }> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${opts.apiKey}`,
    },
    body: JSON.stringify({
      from: FROM_ADDRESS,
      to: opts.to,
      reply_to: opts.replyTo,
      subject: opts.subject,
      html: opts.html,
      text: opts.text,
    }),
  });
  if (!res.ok) {
    const errorText = await res.text();
    console.error("Resend API error:", errorText);
    return { ok: false, error: errorText };
  }
  const data = await res.json().catch(() => ({}));
  return { ok: true, id: data?.id ?? null };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const body = (await req.json()) as BookingPayload;

    // Pflichtfelder prüfen
    const missing: string[] = [];
    if (!body.vorname) missing.push("vorname");
    if (!body.nachname) missing.push("nachname");
    if (!body.email) missing.push("email");
    if (!body.strasse) missing.push("strasse");
    if (!body.plz) missing.push("plz");
    if (!body.ort) missing.push("ort");
    if (!body.land) missing.push("land");
    if (!body.agbAccepted) missing.push("agbAccepted");
    if (!body.privacyAccepted) missing.push("privacyAccepted");
    if (missing.length > 0) {
      return new Response(
        JSON.stringify({ error: `Pflichtfelder fehlen: ${missing.join(", ")}` }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const RAW_KEY = Deno.env.get("RESEND_API_KEY") ?? "";
    const RESEND_API_KEY = sanitizeKey(RAW_KEY);
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY not configured");
      return new Response(
        JSON.stringify({ error: "E-Mail-Service nicht konfiguriert" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Eingaben escapen
    const safe = {
      vorname: escapeHtml(body.vorname),
      nachname: escapeHtml(body.nachname),
      email: escapeHtml(body.email),
      telefon: body.telefon ? escapeHtml(body.telefon) : null,
      firma: body.firma ? escapeHtml(body.firma) : null,
      strasse: escapeHtml(body.strasse),
      plz: escapeHtml(body.plz),
      ort: escapeHtml(body.ort),
      land: escapeHtml(body.land),
      ustIdNr: body.ustIdNr ? escapeHtml(body.ustIdNr) : null,
      nachricht: body.nachricht ? escapeHtml(body.nachricht) : null,
    };

    const fullName = `${body.vorname} ${body.nachname}`.trim();
    const safeFullName = escapeHtml(fullName);
    const priceFmt = body.totalPriceNetto.toLocaleString("de-DE");

    // === ADMIN-MAIL (an claudiaconen@umsatzstimme.de) ===
    const adminSubject = `🎉 Neue Buchung Spanien-Workshop: ${fullName} — ${priceFmt} € netto`;

    const adminHtml = `<!DOCTYPE html>
<html lang="de"><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;font-family:'Inter','Segoe UI',Tahoma,sans-serif;background:#FBF7F0;color:#2A1F3D;">
  <div style="max-width:640px;margin:32px auto;background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 12px 40px rgba(42,31,61,0.12);">
    <div style="background:linear-gradient(135deg,#D4AF37 0%,#C97AAF 100%);padding:32px 36px;color:#2A1F3D;">
      <div style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;opacity:0.85;font-weight:700;">Neue verbindliche Buchung</div>
      <h1 style="margin:8px 0 0;font-size:26px;font-weight:900;letter-spacing:-0.02em;">${safeFullName}</h1>
      <div style="margin-top:6px;font-size:14px;opacity:0.9;">KI-Workshop-Woche Spanien · 28.06. – 05.07.2026</div>
    </div>

    <div style="padding:32px 36px;">
      <div style="background:#FDE8F2;border:1px solid #E8B4C8;border-radius:14px;padding:16px 20px;margin-bottom:24px;">
        <div style="font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#C97AAF;font-weight:700;">Aktion erforderlich</div>
        <div style="margin-top:6px;color:#2A1F3D;font-weight:600;">Bitte Rechnung über ${priceFmt} € netto (zzgl. MwSt.) an die untenstehende Anschrift erstellen und an ${safe.email} versenden.</div>
      </div>

      <h2 style="margin:0 0 12px;font-size:13px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#6B5F7A;">Rechnungsdaten</h2>
      <table role="presentation" cellspacing="0" cellpadding="0" style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr><td style="padding:6px 0;color:#6B5F7A;width:140px;">Name</td><td style="padding:6px 0;color:#2A1F3D;font-weight:600;">${safeFullName}</td></tr>
        ${safe.firma ? `<tr><td style="padding:6px 0;color:#6B5F7A;">Firma</td><td style="padding:6px 0;color:#2A1F3D;font-weight:600;">${safe.firma}</td></tr>` : ""}
        <tr><td style="padding:6px 0;color:#6B5F7A;">Anschrift</td><td style="padding:6px 0;color:#2A1F3D;">${safe.strasse}<br>${safe.plz} ${safe.ort}<br>${safe.land}</td></tr>
        ${safe.ustIdNr ? `<tr><td style="padding:6px 0;color:#6B5F7A;">USt-IdNr.</td><td style="padding:6px 0;color:#2A1F3D;font-family:'SFMono-Regular',Menlo,monospace;">${safe.ustIdNr}</td></tr>` : ""}
      </table>

      <h2 style="margin:24px 0 12px;font-size:13px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#6B5F7A;">Kontakt</h2>
      <table role="presentation" cellspacing="0" cellpadding="0" style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr><td style="padding:6px 0;color:#6B5F7A;width:140px;">E-Mail</td><td style="padding:6px 0;"><a href="mailto:${safe.email}" style="color:#C97AAF;text-decoration:none;font-weight:600;">${safe.email}</a></td></tr>
        ${safe.telefon ? `<tr><td style="padding:6px 0;color:#6B5F7A;">Telefon</td><td style="padding:6px 0;color:#2A1F3D;">${safe.telefon}</td></tr>` : ""}
      </table>

      <h2 style="margin:24px 0 12px;font-size:13px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#6B5F7A;">Buchung</h2>
      <div style="background:#FBF1D8;border:1px solid #D4AF37;border-radius:14px;padding:16px 20px;">
        <div style="display:flex;justify-content:space-between;align-items:baseline;">
          <strong style="color:#2A1F3D;font-size:15px;">KI-Workshop-Woche Spanien (5 Lerntage)</strong>
          <span style="font-family:'SFMono-Regular',Menlo,monospace;font-weight:900;font-size:20px;color:#2A1F3D;">${priceFmt} €</span>
        </div>
        <div style="margin-top:6px;font-size:12px;color:#6B5F7A;">netto · zzgl. gesetzlicher MwSt. · 28.06. – 05.07.2026</div>
        <div style="margin-top:6px;font-size:12px;color:#6B5F7A;">Bestätigungen: AGB ✓ · Datenschutz ✓</div>
      </div>

      ${safe.nachricht ? `<h2 style="margin:24px 0 12px;font-size:13px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#6B5F7A;">Nachricht</h2>
      <div style="background:#FBF7F0;border:1px solid #E8B4C8;border-radius:14px;padding:16px 20px;font-size:14px;line-height:1.5;color:#2A1F3D;white-space:pre-wrap;">${safe.nachricht}</div>` : ""}
    </div>

    <div style="background:#2A1F3D;padding:22px 36px;text-align:center;color:rgba(255,255,255,0.7);font-size:12px;">
      Spanien KI-Workshop · Automatische Buchungs-Benachrichtigung
    </div>
  </div>
</body></html>`;

    const adminText = `Neue verbindliche Buchung Spanien-Workshop

Bitte Rechnung über ${priceFmt} € netto (zzgl. MwSt.) erstellen.

Name: ${fullName}${body.firma ? `\nFirma: ${body.firma}` : ""}
Anschrift: ${body.strasse}, ${body.plz} ${body.ort}, ${body.land}${body.ustIdNr ? `\nUSt-IdNr.: ${body.ustIdNr}` : ""}

E-Mail: ${body.email}${body.telefon ? `\nTelefon: ${body.telefon}` : ""}

Buchung: KI-Workshop-Woche Spanien · 28.06. – 05.07.2026 · ${priceFmt} € netto
AGB akzeptiert: ja
Datenschutz akzeptiert: ja${body.nachricht ? `\n\nNachricht:\n${body.nachricht}` : ""}`;

    const adminResult = await sendResendEmail({
      apiKey: RESEND_API_KEY,
      to: [ADMIN_RECIPIENT],
      replyTo: body.email,
      subject: adminSubject,
      html: adminHtml,
      text: adminText,
    });

    // === KUNDEN-BESTÄTIGUNG ===
    const customerSubject = `Deine Buchung Spanien-Workshop ist bei uns ✨`;

    const customerHtml = `<!DOCTYPE html>
<html lang="de"><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;font-family:'Inter','Segoe UI',Tahoma,sans-serif;background:#FBF7F0;color:#2A1F3D;">
  <div style="max-width:600px;margin:32px auto;background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 12px 40px rgba(42,31,61,0.12);">
    <div style="background:linear-gradient(135deg,#D4AF37 0%,#E8B4C8 100%);padding:36px;color:#2A1F3D;text-align:center;">
      <div style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;opacity:0.85;font-weight:700;">Buchung eingegangen</div>
      <h1 style="margin:8px 0 0;font-size:30px;font-weight:900;letter-spacing:-0.02em;">Wir freuen uns auf dich, ${escapeHtml(body.vorname)}!</h1>
      <div style="margin-top:8px;font-size:14px;opacity:0.9;">KI-Workshop-Woche · Spanien · 28.06. – 05.07.2026</div>
    </div>

    <div style="padding:32px 36px;">
      <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#2A1F3D;">
        Deine verbindliche Buchung der KI-Workshop-Woche in Spanien ist bei uns eingegangen.
        Wir sind glücklich, dass du dabei bist.
      </p>

      <h2 style="margin:24px 0 12px;font-size:13px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#6B5F7A;">So geht es weiter</h2>
      <ol style="margin:0;padding:0 0 0 20px;color:#2A1F3D;font-size:15px;line-height:1.7;">
        <li>In den nächsten <strong>1–2 Werktagen</strong> bekommst du von uns eine Rechnung per E-Mail über <strong>${priceFmt} € netto</strong> (zzgl. gesetzlicher MwSt.).</li>
        <li>Sobald die Zahlung bei uns eingegangen ist, ist dein Platz endgültig gesichert.</li>
        <li>Wenige Wochen vor dem Workshop bekommst du von uns alle Infos zum Hotel, Anreise-Empfehlungen und den genauen Ablauf.</li>
      </ol>

      <div style="margin-top:28px;background:#FBF1D8;border:1px solid #D4AF37;border-radius:14px;padding:18px 22px;">
        <div style="font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#A8801F;font-weight:700;">Deine Termine</div>
        <div style="margin-top:8px;font-size:14px;color:#2A1F3D;line-height:1.7;">
          <strong>So, 28.06.2026</strong> · Anreisetag<br>
          <strong>Mo, 29.06.2026</strong> · Workshop-Beginn<br>
          <strong>Mo – Fr</strong> · Lernzeit 09:00 – 13:00 &amp; 16:00 – 18:00 Uhr<br>
          <strong>Sa, 04.07.2026</strong> · Auszeit-Tag<br>
          <strong>So, 05.07.2026</strong> · Abreisetag
        </div>
      </div>

      <p style="margin:28px 0 0;font-size:15px;line-height:1.6;color:#2A1F3D;">
        Falls du eine Frage hast, antworte einfach auf diese E-Mail.
      </p>
      <p style="margin:16px 0 0;font-size:15px;line-height:1.6;color:#2A1F3D;">
        Bis bald in Spanien,<br>
        <strong>Claudia Conen &amp; Gabi Lindemann</strong>
      </p>
    </div>

    <div style="background:#2A1F3D;padding:22px 36px;text-align:center;color:rgba(255,255,255,0.7);font-size:12px;">
      Claudia Conen · claudiaconen.com
    </div>
  </div>
</body></html>`;

    const customerText = `Hallo ${body.vorname},

deine verbindliche Buchung der KI-Workshop-Woche in Spanien (28.06. – 05.07.2026) ist bei uns eingegangen. Wir freuen uns sehr.

So geht es weiter:
1. In den nächsten 1–2 Werktagen bekommst du von uns eine Rechnung per E-Mail über ${priceFmt} € netto (zzgl. gesetzlicher MwSt.).
2. Sobald die Zahlung eingegangen ist, ist dein Platz endgültig gesichert.
3. Wenige Wochen vor dem Workshop bekommst du alle Infos zu Hotel, Anreise und Ablauf.

Deine Termine:
- So, 28.06.2026 · Anreisetag
- Mo, 29.06.2026 · Workshop-Beginn
- Lernzeiten Mo–Fr: 09:00 – 13:00 & 16:00 – 18:00 Uhr
- Sa, 04.07.2026 · Auszeit-Tag
- So, 05.07.2026 · Abreisetag

Bei Fragen einfach auf diese Mail antworten.

Bis bald in Spanien,
Claudia Conen & Gabi Lindemann`;

    const customerResult = await sendResendEmail({
      apiKey: RESEND_API_KEY,
      to: [body.email],
      replyTo: ADMIN_RECIPIENT,
      subject: customerSubject,
      html: customerHtml,
      text: customerText,
    });

    return new Response(
      JSON.stringify({
        ok: adminResult.ok,
        adminMail: adminResult,
        customerMail: customerResult,
      }),
      {
        status: adminResult.ok ? 200 : 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  } catch (err) {
    console.error("send-spanien-booking-notification error:", err);
    return new Response(
      JSON.stringify({
        error: err instanceof Error ? err.message : "unknown error",
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
