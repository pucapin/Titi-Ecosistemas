create table public."Niño" (
  id uuid not null default gen_random_uuid (),
  id_padre uuid null,
  id_juego uuid null,
  name text null,
  puntos numeric null default '0'::numeric,
  constraint Niño_pkey primary key (id),
  constraint Niño_id_padre_fkey foreign KEY (id_padre) references "Padre" (id)
) TABLESPACE pg_default;