create table public."Preguntas" (
  id uuid not null default gen_random_uuid (),
  id_estacion uuid null,
  pregunta text null,
  opcion_a text null,
  opcion_b text null,
  opcion_c text null,
  opcion_d text null,
  correct text null,
  constraint Preguntas_pkey primary key (id),
  constraint Preguntas_id_estacion_fkey foreign KEY (id_estacion) references "Estacion" (id)
) TABLESPACE pg_default;