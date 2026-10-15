-- Gemeinsame Terminuebersicht fuer Claudia & Gabi (Events, Workshops, Kundentermine).
-- PRIVAT: RLS an, KEINE anon-Policies -> nur service_role (Edge-Function team-termine
-- nach Admin-Token-Pruefung) darf lesen/schreiben. Kundendaten nicht oeffentlich lesbar.
CREATE TABLE IF NOT EXISTS public.team_termine (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  titel text NOT NULL,
  art text NOT NULL DEFAULT 'kunde',            -- event | workshop | kunde | sonstiges
  start_am timestamptz NOT NULL,
  ende_am timestamptz,
  ganztags boolean NOT NULL DEFAULT false,
  ort text,
  kunde text,
  wer text,                                     -- Claudia | Gabi | Beide | ...
  notizen text,
  erstellt_von text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE public.team_termine ENABLE ROW LEVEL SECURITY;
CREATE INDEX IF NOT EXISTS team_termine_start_idx ON public.team_termine (start_am);
