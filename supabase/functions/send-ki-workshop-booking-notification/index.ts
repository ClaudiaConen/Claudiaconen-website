import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const ADMIN_RECIPIENT = "claudiaconen@umsatzstimme.de";
const FROM_ADDRESS = "KI-Workshop <noreply@claudiaconen.com>";

type Tier = "basis" | "plus" | "vip";

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
  tier: Tier;
  tierPriceNetto: number;
  agbAccepted: boolean;
  privacyAccepted: boolean;
}

const TIER_LABEL: Record<Tier, string> = {
  basis: "Basis",
  plus: "Plus (Empfohlen)",
  vip: "VIP",
};

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

    const missing: string[] = [];
    if (!body.vorname) missing.push("vorname");
    if (!body.nachname) missing.push("nachname");
    if (!body.email) missing.push("email");
    if (!body.strasse) missing.push("strasse");
    if (!body.plz) missing.push("plz");
    if (!body.ort) missing.push("ort");
    if (!body.land) missing.push("land");
    if (!body.tier) missing.push("tier");
    if (!body.tierPriceNetto) missing.push("tierPriceNetto");
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
      return new Response(
        JSON.stringify({ error: "E-Mail-Service nicht konfiguriert" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

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
    const priceFmt = body.tierPriceNetto.toLocaleString("de-DE");
    const tierLabel = TIER_LABEL[body.tier] ?? body.tier;
    const safeTierLabel = escapeHtml(tierLabel);

    // === ADMIN-MAIL ===
    const adminSubject = `🎉 KI-Workshop Buchung: ${fullName} — ${safeTierLabel} (${priceFmt} € netto)`;

    const adminHtml = `<!DOCTYPE html>
<html lang="de"><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;font-family:'Inter','Segoe UI',Tahoma,sans-serif;background:#0A1428;color:#FDFCFA;">
  <div style="max-width:640px;margin:32px auto;background:#131D3B;border-radius:20px;overflow:hidden;box-shadow:0 12px 40px rgba(0,0,0,0.5);">
    <div style="background:linear-gradient(135deg,#FFCE3D 0%,#FF3FA1 100%);padding:32px 36px;color:#0A1428;">
      <div style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;font-weight:700;opacity:0.85;">Neue verbindliche Buchung</div>
      <h1 style="margin:8px 0 0;font-size:26px;font-weight:900;letter-spacing:-0.02em;">${safeFullName}</h1>
      <div style="margin-top:6px;font-size:14px;opacity:0.9;">KI-Workshop · Die Unverwechselbaren · 2-Tage live</div>
    </div>

    <div style="padding:32px 36px;">
      <div style="background:rgba(255,63,161,0.12);border:1px solid rgba(255,63,161,0.4);border-radius:14px;padding:16px 20px;margin-bottom:24px;">
        <div style="font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#FF6BB8;font-weight:700;">Aktion erforderlich</div>
        <div style="margin-top:6px;color:#FDFCFA;font-weight:600;">Bitte Rechnung über ${priceFmt} € netto (zzgl. MwSt.) erstellen und an ${safe.email} senden.</div>
      </div>

      <h2 style="margin:0 0 12px;font-size:13px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:rgba(253,252,250,0.7);">Gebuchte Leistung</h2>
      <div style="background:rgba(255,206,61,0.08);border:1px solid rgba(255,206,61,0.3);border-radius:14px;padding:16px 20px;">
        <div style="display:flex;justify-content:space-between;align-items:baseline;">
          <strong style="color:#FFCE3D;font-size:15px;">KI-Workshop · Tier ${safeTierLabel}</strong>
          <span style="font-family:'SFMono-Regular',Menlo,monospace;font-weight:900;font-size:20px;color:#FFCE3D;">${priceFmt} €</span>
        </div>
        <div style="margin-top:6px;font-size:12px;color:rgba(253,252,250,0.7);">netto · zzgl. gesetzlicher MwSt.</div>
        <div style="margin-top:6px;font-size:12px;color:rgba(253,252,250,0.6);">AGB ✓ · Datenschutz ✓</div>
      </div>

      <h2 style="margin:24px 0 12px;font-size:13px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:rgba(253,252,250,0.7);">Rechnungsdaten</h2>
      <table role="presentation" cellspacing="0" cellpadding="0" style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr><td style="padding:6px 0;color:rgba(253,252,250,0.6);width:140px;">Name</td><td style="padding:6px 0;color:#FDFCFA;font-weight:600;">${safeFullName}</td></tr>
        ${safe.firma ? `<tr><td style="padding:6px 0;color:rgba(253,252,250,0.6);">Firma</td><td style="padding:6px 0;color:#FDFCFA;font-weight:600;">${safe.firma}</td></tr>` : ""}
        <tr><td style="padding:6px 0;color:rgba(253,252,250,0.6);">Anschrift</td><td style="padding:6px 0;color:#FDFCFA;">${safe.strasse}<br>${safe.plz} ${safe.ort}<br>${safe.land}</td></tr>
        ${safe.ustIdNr ? `<tr><td style="padding:6px 0;color:rgba(253,252,250,0.6);">USt-IdNr.</td><td style="padding:6px 0;color:#FDFCFA;font-family:'SFMono-Regular',Menlo,monospace;">${safe.ustIdNr}</td></tr>` : ""}
      </table>

      <h2 style="margin:24px 0 12px;font-size:13px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:rgba(253,252,250,0.7);">Kontakt</h2>
      <table role="presentation" cellspacing="0" cellpadding="0" style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr><td style="padding:6px 0;color:rgba(253,252,250,0.6);width:140px;">E-Mail</td><td style="padding:6px 0;"><a href="mailto:${safe.email}" style="color:#FF6BB8;text-decoration:none;font-weight:600;">${safe.email}</a></td></tr>
        ${safe.telefon ? `<tr><td style="padding:6px 0;color:rgba(253,252,250,0.6);">Telefon</td><td style="padding:6px 0;color:#FDFCFA;">${safe.telefon}</td></tr>` : ""}
      </table>

      ${safe.nachricht ? `<h2 style="margin:24px 0 12px;font-size:13px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:rgba(253,252,250,0.7);">Nachricht</h2>
      <div style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.14);border-radius:14px;padding:16px 20px;font-size:14px;line-height:1.5;color:#FDFCFA;white-space:pre-wrap;">${safe.nachricht}</div>` : ""}
    </div>

    <div style="background:#0A1428;padding:22px 36px;text-align:center;color:rgba(253,252,250,0.5);font-size:12px;">
      KI-Workshop · Die Unverwechselbaren · automatische Buchungs-Benachrichtigung
    </div>
  </div>
</body></html>`;

    const adminText = `Neue verbindliche Buchung — KI-Workshop "Die Unverwechselbaren"

Bitte Rechnung über ${priceFmt} € netto (zzgl. MwSt.) erstellen.

Gebuchter Tier: ${tierLabel}
Preis: ${priceFmt} € netto

Name: ${fullName}${body.firma ? `\nFirma: ${body.firma}` : ""}
Anschrift: ${body.strasse}, ${body.plz} ${body.ort}, ${body.land}${body.ustIdNr ? `\nUSt-IdNr.: ${body.ustIdNr}` : ""}

E-Mail: ${body.email}${body.telefon ? `\nTelefon: ${body.telefon}` : ""}

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
    const customerSubject = `Deine Anmeldung zum KI-Workshop „Die Unverwechselbaren" ist bei uns ✨`;

    const customerHtml = `<!DOCTYPE html>
<html lang="de"><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;font-family:'Inter','Segoe UI',Tahoma,sans-serif;background:#0A1428;color:#FDFCFA;">
  <div style="max-width:600px;margin:32px auto;background:#131D3B;border-radius:20px;overflow:hidden;box-shadow:0 12px 40px rgba(0,0,0,0.5);">
    <div style="background:linear-gradient(135deg,#FFCE3D 0%,#FF3FA1 100%);padding:36px;color:#0A1428;text-align:center;">
      <div style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;font-weight:700;opacity:0.85;">Anmeldung eingegangen</div>
      <h1 style="margin:8px 0 0;font-size:28px;font-weight:900;letter-spacing:-0.02em;">Wir freuen uns auf dich, ${escapeHtml(body.vorname)}!</h1>
      <div style="margin-top:8px;font-size:14px;opacity:0.9;">KI-Workshop · Die Unverwechselbaren</div>
    </div>

    <div style="padding:32px 36px;">
      <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#FDFCFA;">
        Deine verbindliche Buchung des KI-Workshops ist bei uns eingegangen. Wir sind glücklich, dass du dabei bist.
      </p>

      <div style="background:rgba(255,206,61,0.08);border:1px solid rgba(255,206,61,0.3);border-radius:14px;padding:18px 22px;margin-top:16px;">
        <div style="font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#FFCE3D;font-weight:700;">Deine Buchung</div>
        <div style="margin-top:8px;font-size:15px;color:#FDFCFA;">
          <strong>Tier ${safeTierLabel}</strong> · ${priceFmt} € netto (zzgl. MwSt.)
        </div>
      </div>

      <h2 style="margin:24px 0 12px;font-size:13px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:rgba(253,252,250,0.7);">So geht es weiter</h2>
      <ol style="margin:0;padding:0 0 0 20px;color:#FDFCFA;font-size:15px;line-height:1.7;">
        <li>In den nächsten <strong>1–2 Werktagen</strong> bekommst du von uns eine Rechnung per E-Mail über <strong>${priceFmt} € netto</strong> (zzgl. MwSt.).</li>
        <li>Sobald die Zahlung bei uns eingegangen ist, ist dein Platz endgültig gesichert.</li>
        <li>Etwa eine Woche vor dem Workshop gibt es einen <strong>kostenlosen Zoom-Vorbereitungs-Call</strong>, in dem wir alle Tools-Zugänge gemeinsam einrichten.</li>
      </ol>

      <p style="margin:28px 0 0;font-size:15px;line-height:1.6;color:#FDFCFA;">
        Falls du eine Frage hast, antworte einfach auf diese E-Mail.
      </p>
      <p style="margin:16px 0 0;font-size:15px;line-height:1.6;color:#FDFCFA;">
        Bis bald,<br>
        <strong style="color:#FFCE3D;">Claudia Conen · Gabi Lindemann · Ann-Kathrin Andresen</strong>
      </p>
    </div>

    <div style="background:#0A1428;padding:22px 36px;text-align:center;color:rgba(253,252,250,0.5);font-size:12px;">
      Die Unverwechselbaren · claudiaconen.com
    </div>
  </div>
</body></html>`;

    const customerText = `Hallo ${body.vorname},

deine verbindliche Buchung des KI-Workshops „Die Unverwechselbaren" ist bei uns eingegangen.

Deine Buchung:
- Tier: ${tierLabel}
- Preis: ${priceFmt} € netto (zzgl. MwSt.)

So geht es weiter:
1. In den nächsten 1–2 Werktagen bekommst du von uns eine Rechnung per E-Mail.
2. Sobald die Zahlung eingegangen ist, ist dein Platz endgültig gesichert.
3. Etwa eine Woche vor dem Workshop gibt es einen kostenlosen Zoom-Vorbereitungs-Call.

Bei Fragen einfach auf diese Mail antworten.

Bis bald,
Claudia Conen · Gabi Lindemann · Ann-Kathrin Andresen`;

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
    console.error("send-ki-workshop-booking-notification error:", err);
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
