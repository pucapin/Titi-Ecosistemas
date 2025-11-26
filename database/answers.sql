create table public."Respuestas" (
  id uuid not null default gen_random_uuid (),
  id_niño uuid not null,
  id_pregunta uuid not null,
  respuesta text not null,
  correcta boolean null,
  constraint Respuestas_pkey primary key (id),
  constraint Respuestas_id_niño_fkey foreign KEY ("id_niño") references "Niño" (id),
  constraint Respuestas_id_pregunta_fkey foreign KEY (id_pregunta) references "Preguntas" (id)
) TABLESPACE pg_default;