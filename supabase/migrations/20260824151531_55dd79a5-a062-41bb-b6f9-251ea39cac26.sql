CREATE TABLE public.countries (
  iso text PRIMARY KEY,
  name text NOT NULL,
  region text NOT NULL,
  cover text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.countries TO anon, authenticated;
GRANT ALL ON public.countries TO service_role;
ALTER TABLE public.countries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "countries are publicly readable" ON public.countries FOR SELECT TO anon, authenticated USING (true);

CREATE TABLE public.visa_rules (
  nationality_iso text NOT NULL REFERENCES public.countries(iso) ON DELETE CASCADE,
  destination_iso text NOT NULL REFERENCES public.countries(iso) ON DELETE CASCADE,
  access text NOT NULL CHECK (access IN ('free','voa','eta','required')),
  note text,
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (nationality_iso, destination_iso)
);
CREATE INDEX visa_rules_nationality_idx ON public.visa_rules (nationality_iso);
GRANT SELECT ON public.visa_rules TO anon, authenticated;
GRANT ALL ON public.visa_rules TO service_role;
ALTER TABLE public.visa_rules ENABLE ROW LEVEL SECURITY;
CREATE POLICY "visa rules are publicly readable" ON public.visa_rules FOR SELECT TO anon, authenticated USING (true);

CREATE TABLE public.passport_snapshots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  iso text NOT NULL REFERENCES public.countries(iso) ON DELETE CASCADE,
  captured_at date NOT NULL DEFAULT CURRENT_DATE,
  rank integer NOT NULL,
  regional_rank integer NOT NULL DEFAULT 0,
  visa_free integer NOT NULL DEFAULT 0,
  visa_on_arrival integer NOT NULL DEFAULT 0,
  eta integer NOT NULL DEFAULT 0,
  visa_required integer NOT NULL DEFAULT 0,
  mobility numeric NOT NULL DEFAULT 0,
  source text NOT NULL DEFAULT 'seed',
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (iso, captured_at)
);
CREATE INDEX passport_snapshots_captured_idx ON public.passport_snapshots (captured_at DESC);
GRANT SELECT ON public.passport_snapshots TO anon, authenticated;
GRANT ALL ON public.passport_snapshots TO service_role;
ALTER TABLE public.passport_snapshots ENABLE ROW LEVEL SECURITY;
CREATE POLICY "snapshots are publicly readable" ON public.passport_snapshots FOR SELECT TO anon, authenticated USING (true);

CREATE TABLE public.data_sync_runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  started_at timestamptz NOT NULL DEFAULT now(),
  finished_at timestamptz,
  status text NOT NULL DEFAULT 'running' CHECK (status IN ('running','success','partial','failed')),
  source text NOT NULL,
  rows_upserted integer NOT NULL DEFAULT 0,
  message text
);
CREATE INDEX data_sync_runs_started_idx ON public.data_sync_runs (started_at DESC);
GRANT SELECT ON public.data_sync_runs TO anon, authenticated;
GRANT ALL ON public.data_sync_runs TO service_role;
ALTER TABLE public.data_sync_runs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "sync runs are publicly readable" ON public.data_sync_runs FOR SELECT TO anon, authenticated USING (true);