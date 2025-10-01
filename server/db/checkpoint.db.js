

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

module.exports = {
  getCheckpointDB
};