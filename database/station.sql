create table public."Estacion" (
  id uuid not null default gen_random_uuid (),
  check_1 uuid null,
  check_2 uuid null,
  check_3 uuid null,
  name text null,
  constraint Estación_pkey primary key (id)
) TABLESPACE pg_default;