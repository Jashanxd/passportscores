DROP POLICY IF EXISTS "sync runs are publicly readable" ON public.data_sync_runs;
REVOKE SELECT ON public.data_sync_runs FROM anon, authenticated;
GRANT ALL ON public.data_sync_runs TO service_role;