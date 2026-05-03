import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const ADMIN_RECIPIENTS = [
  "claudiaconen@umsatzstimme.de",
  "kontakt@the-power-of-ai.team",
];

interface RequestBody {
  name: string;
  email: string;
  telefon?: string | null;
  unternehmen?: string | null;
  stadt?: string | null;
  tier: "standard" | "business" | "premium";
  tierPrice: number;
  addonSparring: boolean;
  addonChronist: boolean;
  totalPrice: number;
  beitragstitel?: string | null;
  anmeldungId?: string | null;
}

const TIER_LABEL: Record<RequestBody["tier"], string> = {
  standard: "Standard · 4 Seiten · 50 Hardcover",
  business: "Business · 6 Seiten · 60 Hardcover",
  premium: "Premium · 8 Seiten · 70 Hardcover",
};

function escapeHtml(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const body = (await req.json()) as RequestBody;

    if (!body.name || !body.email || !body.tier) {
      return new Response(
        JSON.stringify({ error: "name, email und tier sind erforderlich" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY not configured");
      throw new Error("E-Mail-Service nicht konfiguriert");
    }

    const tierLabel = TIER_LABEL[body.tier] ?? body.tier;
    const addons: string[] = [];
    if (body.addonSparring) addons.push("Story-Sparring (333 €)");
    if (body.addonChronist) addons.push("Persönlicher Chronist (1.555 €)");

    const subject = `🎉 Neue Buchprojekt-Anmeldung: ${body.name} — ${TIER_LABEL[body.tier].split(" · ")[0]}`;

    const safeName = escapeHtml(body.name);
    const safeEmail = escapeHtml(body.email);
    const safeTelefon = body.telefon ? escapeHtml(body.telefon) : null;
    const safeUnt = body.unternehmen ? escapeHtml(body.unternehmen) : null;
    const safeStadt = body.stadt ? escapeHtml(body.stadt) : null;
    const safeBeitrag = body.beitragstitel ? escapeHtml(body.beitragstitel) : null;

    const total = body.totalPrice.toLocaleString("de-DE");
    const tierPriceFmt = body.tierPrice.toLocaleString("de-DE");

    const emailHtml = `<!DOCTYPE html>
<html lang="de"><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;font-family:'Inter','Segoe UI',Tahoma,sans-serif;background:#f5f5f7;color:#0F0A2A;">
  <div style="max-width:600px;margin:32px auto;background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 12px 40px rgba(15,10,42,0.12);">
    <div style="background:linear-gradient(135deg,#D6388F 0%,#A02478 100%);padding:32px 36px;color:#fff;">
      <div style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;opacity:0.85;font-weight:700;">Neue Anmeldung</div>
      <h1 style="margin:8px 0 0;font-size:28px;font-weight:900;letter-spacing:-0.02em;">Buchprojekt: ${safeName}</h1>
      <div style="margin-top:6px;font-size:14px;opacity:0.9;">Hauptbuch 2026 · Premiere Edition</div>
    </div>

    <div style="padding:32px 36px;">
      <h2 style="margin:0 0 12px;font-size:13px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#6E6A86;">Produkt</h2>
      <div style="background:#FBF9F4;border:1px solid #E8E4F0;border-radius:14px;padding:16px 20px;">
        <div style="display:flex;justify-content:space-between;align-items:baseline;gap:10px;">
          <strong style="color:#0F0A2A;font-size:15px;">${escapeHtml(tierLabel)}</strong>
          <span style="font-family:'SFMono-Regular',Menlo,monospace;font-weight:700;color:#0F0A2A;">${tierPriceFmt} €</span>
        </div>
        ${addons.map((a) => `<div style=\"margin-top:6px;font-size:13px;color:#3F3A5F;\">+ ${escapeHtml(a)}</div>`).join("")}
        <div style="margin-top:14px;padding-top:14px;border-top:1px solid #E8E4F0;display:flex;justify-content:space-between;align-items:baseline;">
          <span style="font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#6E6A86;font-weight:700;">Gesamtpreis</span>
          <span style="font-family:'SFMono-Regular',Menlo,monospace;font-weight:900;font-size:22px;color:#0F0A2A;">${total} €</span>
        </div>
      </div>

      <h2 style="margin:24px 0 12px;font-size:13px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#6E6A86;">Kontakt</h2>
      <table role="presentation" cellspacing="0" cellpadding="0" style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr><td style="padding:6px 0;color:#6E6A86;width:130px;">Name</td><td style="padding:6px 0;color:#0F0A2A;font-weight:600;">${safeName}</td></tr>
        <tr><td style="padding:6px 0;color:#6E6A86;">E-Mail</td><td style="padding:6px 0;"><a href="mailto:${safeEmail}" style="color:#D6388F;text-decoration:none;font-weight:600;">${safeEmail}</a></td></tr>
        ${safeTelefon ? `<tr><td style=\"padding:6px 0;color:#6E6A86;\">Telefon</td><td style=\"padding:6px 0;color:#0F0A2A;\">${safeTelefon}</td></tr>` : ""}
        ${safeUnt ? `<tr><td style=\"padding:6px 0;color:#6E6A86;\">Unternehmen</td><td style=\"padding:6px 0;color:#0F0A2A;\">${safeUnt}</td></tr>` : ""}
        ${safeStadt ? `<tr><td style=\"padding:6px 0;color:#6E6A86;\">Stadt</td><td style=\"padding:6px 0;color:#0F0A2A;\">${safeStadt}</td></tr>` : ""}
        ${safeBeitrag ? `<tr><td style=\"padding:6px 0;color:#6E6A86;\">Beitragstitel</td><td style=\"padding:6px 0;color:#0F0A2A;\">${safeBeitrag}</td></tr>` : ""}
      </table>

      <div style="margin-top:28px;padding:14px 18px;background:#FDE8F2;border:1px solid #f3c1dc;border-radius:12px;color:#A02478;font-size:13px;line-height:1.55;">
        💡 Vollständige Bewerbung mit Story, Foto und QR-Code findest du im Admin-Dashboard:<br>
        <a href="https://claudiaconen.com/admin/buchprojekt" style="color:#A02478;font-weight:700;text-decoration:none;">claudiaconen.com/admin/buchprojekt</a>
      </div>
    </div>

    <div style="background:#0F0A2A;padding:22px 36px;text-align:center;color:rgba(255,255,255,0.7);font-size:12px;">
      Power of AI · Hauptbuch 2026 — automatische Benachrichtigung
    </div>
  </div>
</body></html>`;

    const textPart = `Neue Buchprojekt-Anmeldung

Name: ${body.name}
E-Mail: ${body.email}${body.telefon ? `\nTelefon: ${body.telefon}` : ""}${body.unternehmen ? `\nUnternehmen: ${body.unternehmen}` : ""}${body.stadt ? `\nStadt: ${body.stadt}` : ""}

Produkt: ${tierLabel}
Tier-Preis: ${tierPriceFmt} €${addons.length ? `\nAdd-Ons: ${addons.join(", ")}` : ""}
Gesamtpreis: ${total} €${body.beitragstitel ? `\n\nBeitragstitel: ${body.beitragstitel}` : ""}

Volle Bewerbung im Admin-Dashboard: https://claudiaconen.com/admin/buchprojekt`;

    console.log("Sending Buchprojekt notification to admin:", ADMIN_RECIPIENT, "for:", body.email);

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Buchprojekt <noreply@claudiaconen.com>",
        to: [ADMIN_RECIPIENT],
        reply_to: body.email,
        subject,
        html: emailHtml,
        text: textPart,
      }),
    });

    if (!resendResponse.ok) {
      const errorData = await resendResponse.text();
      console.error("Resend API error:", errorData);
      throw new Error(`Resend: ${errorData}`);
    }

    const resendData = await resendResponse.json();
    console.log("Buchprojekt notification sent:", resendData?.id ?? resendData);

    return new Response(JSON.stringify({ ok: true, id: resendData?.id ?? null }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("send-buchprojekt-notification error:", err);
    return new Response(
      JSON.stringify({
        error: err instanceof Error ? err.message : "unknown error",
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
