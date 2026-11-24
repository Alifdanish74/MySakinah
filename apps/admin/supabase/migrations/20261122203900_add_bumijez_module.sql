insert into public.modules (slug, display_name, description, icon, color_from, color_to)
values (
  'bumijez',
  'Bumijez',
  'Bantuan pengurusan jenazah lengkap di seluruh negara.',
  'heart',
  '#073b4c',
  '#118ab2'
)
on conflict (slug) do update
set display_name = excluded.display_name,
    description = excluded.description,
    icon = excluded.icon,
    color_from = excluded.color_from,
    color_to = excluded.color_to;

create or replace function public.next_receipt_sequence(p_module_slug text)
returns bigint
language plpgsql
security definer
set search_path = ''
as $$
declare
  next_value bigint;
begin
  if p_module_slug is null or p_module_slug not in ('kohasil', 'albarzah', 'bumijez') then
    raise exception 'Unsupported receipt module: %', p_module_slug using errcode = '22023';
  end if;

  insert into public.receipt_sequences (module_slug, last_value)
  values (p_module_slug, 1)
  on conflict (module_slug) do update
    set last_value = public.receipt_sequences.last_value + 1
  returning last_value into next_value;

  return next_value;
end;
$$;

revoke all on function public.next_receipt_sequence(text) from public;
grant execute on function public.next_receipt_sequence(text) to anon, authenticated, service_role;
