create or replace function public.membership_card_lookup_submissions(p_ic text)
returns table (
  id uuid,
  module_id uuid,
  form_data jsonb,
  submitted_by text,
  status text,
  created_at timestamptz,
  tempoh_keahlian text,
  module_display_name text,
  module_slug text
)
language sql
stable
security invoker
set search_path = ''
as $$
  select
    s.id,
    s.module_id,
    s.form_data,
    s.submitted_by,
    s.status,
    s.created_at,
    s.tempoh_keahlian,
    m.display_name,
    m.slug
  from public.submissions as s
  left join public.modules as m on m.id = s.module_id
  where p_ic ~ '^[0-9]{12}$'
    and s.form_data @? (
      '$.** ? (@ == "' || p_ic || '" || @ == "' ||
      substring(p_ic from 1 for 6) || '-' ||
      substring(p_ic from 7 for 2) || '-' ||
      substring(p_ic from 9 for 4) || '")'
    )::jsonpath
  order by s.created_at desc;
$$;

revoke all on function public.membership_card_lookup_submissions(text)
  from public, anon, authenticated;
grant execute on function public.membership_card_lookup_submissions(text)
  to service_role;
