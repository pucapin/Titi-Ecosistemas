
const supabaseCli = require("../services/supabase.service");

// Añadir todos los llamados con su descripción

// GET Checkpoint por ID
const getCheckpointDB = async () => {
  const { data, error } = await supabaseCli.from('Checkpoint').select('id');
  if (error) {
    console.error(error);
    return error;
  }
  return data;
};

const getQuestionDB = async (checkpointId) => {
const { data, error } = await supabaseCli
  .from("Checkpoint")
  .select(`
    id,
    pregunta,
    Preguntas (
      id,
      pregunta,
      opcion_a,
      opcion_b,
      opcion_c,
      opcion_d,
      correct
    )
  `)
  .eq("id", checkpointId)
  .maybeSingle();

  if (error) {
    console.error("Error in getQuestionDB:", error.message);
    return null;
  }

  return data;
};


module.exports = {
  getCheckpointDB,
  getQuestionDB
};