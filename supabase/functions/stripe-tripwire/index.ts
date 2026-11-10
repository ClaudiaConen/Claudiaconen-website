// Stripe-Webhook: schreibt 47-EUR-Tripwire-Kaeufer ("Unverwechselbar PLUS") in public.tripwire_kaeufer.
// Oeffentlich erreichbar (verify_jwt=false); Sicherheit ueber die Stripe-Signatur (STRIPE_WEBHOOK_SECRET).
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.4';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const WEBHOOK_SECRET = Deno.env.get('STRIPE_WEBHOOK_SECRET') ?? '';
const db = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } });

function hex(buf: ArrayBuffer) {
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

async function signaturGueltig(rawBody: string, header: string | null): Promise<boolean> {
  if (!WEBHOOK_SECRET || !header) return false;
  let t = '';
  const v1: string[] = [];
  for (const teil of header.split(',')) {
    const idx = teil.indexOf('=');
    const k = teil.slice(0, idx);
    const v = teil.slice(idx + 1);
    if (k === 't') t = v;
    if (k === 'v1') v1.push(v);
  }
  if (!t || !v1.length) return false;
  const alter = Math.abs(Date.now() / 1000 - Number(t));
  if (!Number.isFinite(alter) || alter > 300) return false; // 5-Minuten-Fenster gegen Replay
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(WEBHOOK_SECRET), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const mac = hex(await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(`${t}.${rawBody}`)));
  return v1.some((sig) => sig === mac);
}

Deno.serve(async (req) => {
  if (req.method !== 'POST') return new Response('POST erforderlich', { status: 405 });
  const rawBody = await req.text();
  const ok = await signaturGueltig(rawBody, req.headers.get('stripe-signature'));
  if (!ok) return new Response('invalid signature', { status: 400 });

  let event: any;
  try { event = JSON.parse(rawBody); } catch { return new Response('bad json', { status: 400 }); }

  try {
    if (event?.type === 'checkout.session.completed') {
      const s = event.data?.object ?? {};
      const email = String(s.customer_details?.email ?? s.customer_email ?? '').trim().toLowerCase();
      const name = s.customer_details?.name ?? null;
      if (email) {
        await db.from('tripwire_kaeufer').upsert({
          email,
          name,
          amount_cents: s.amount_total ?? null,
          currency: s.currency ?? null,
          produkt: 'Unverwechselbar PLUS (47 EUR)',
          stripe_session_id: s.id ?? null,
          raw: s,
        }, { onConflict: 'stripe_session_id' });
      }
    }
  } catch (_e) {
    // Fehler nicht an Stripe zurueckwerfen (sonst endlose Wiederholungen); Eintrag ggf. manuell nachtragen.
  }
  return new Response(JSON.stringify({ received: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
});
