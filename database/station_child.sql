create table public."Estacion_Niño" (
  id uuid not null default gen_random_uuid (),
  id_niño uuid null,
  id_estacion uuid null,
  completed boolean null,
  correctas numeric null,
  constraint Estacion_niño_pkey primary key (id),
  constraint Estacion_niño_id_estacion_fkey foreign KEY (id_estacion) references "Estacion" (id),
  constraint Estacion_niño_id_niño_fkey foreign KEY ("id_niño") references "Niño" (id)
) TABLESPACE pg_default;