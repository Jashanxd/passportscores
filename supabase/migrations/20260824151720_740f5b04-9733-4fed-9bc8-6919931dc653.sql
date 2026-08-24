CREATE OR REPLACE FUNCTION public.recompute_passport_snapshot(_source text DEFAULT 'provider')
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _written integer;
BEGIN
  WITH counts AS (
    SELECT c.iso,
           c.region,
           count(*) FILTER (WHERE r.access = 'free') AS visa_free,
           count(*) FILTER (WHERE r.access = 'voa') AS visa_on_arrival,
           count(*) FILTER (WHERE r.access = 'eta') AS eta,
           count(*) FILTER (WHERE r.access = 'required') AS visa_required
    FROM public.countries c
    JOIN public.visa_rules r ON r.nationality_iso = c.iso
    GROUP BY c.iso, c.region
  ), scored AS (
    SELECT iso, region, visa_free, visa_on_arrival, eta, visa_required,
           (visa_free + visa_on_arrival + eta) AS total_access
    FROM counts
  ), ranked AS (
    SELECT s.*,
           dense_rank() OVER (ORDER BY total_access DESC) AS global_rank,
           dense_rank() OVER (PARTITION BY region ORDER BY total_access DESC) AS region_rank,
           max(total_access) OVER () AS best_access
    FROM scored s
  )
  INSERT INTO public.passport_snapshots
    (iso, captured_at, rank, regional_rank, visa_free, visa_on_arrival, eta, visa_required, mobility, source)
  SELECT iso, CURRENT_DATE, global_rank, region_rank, visa_free, visa_on_arrival, eta, visa_required,
         CASE WHEN best_access > 0 THEN round((total_access::numeric / best_access) * 100, 1) ELSE 0 END,
         _source
  FROM ranked
  ON CONFLICT (iso, captured_at) DO UPDATE SET
    rank = EXCLUDED.rank,
    regional_rank = EXCLUDED.regional_rank,
    visa_free = EXCLUDED.visa_free,
    visa_on_arrival = EXCLUDED.visa_on_arrival,
    eta = EXCLUDED.eta,
    visa_required = EXCLUDED.visa_required,
    mobility = EXCLUDED.mobility,
    source = EXCLUDED.source;

  GET DIAGNOSTICS _written = ROW_COUNT;
  RETURN _written;
END;
$$;

REVOKE ALL ON FUNCTION public.recompute_passport_snapshot(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.recompute_passport_snapshot(text) TO service_role;