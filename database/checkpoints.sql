create table public."Checkpoint" (
  id uuid not null default gen_random_uuid (),
  name text null,
  pregunta uuid null,
  constraint Checkpoint_pkey primary key (id),
  constraint Checkpoint_pregunta_1_fkey foreign KEY (pregunta) references "Preguntas" (id)
) TABLESPACE pg_default;