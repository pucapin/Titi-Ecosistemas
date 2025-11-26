create table public."Padre" (
  id uuid not null default gen_random_uuid (),
  id_niño uuid null,
  name text null,
  contraseña text null,
  join_code text null,
  constraint Padre_pkey primary key (id),
  constraint Padre_id_niño_fkey foreign KEY ("id_niño") references "Niño" (id)
) TABLESPACE pg_default;