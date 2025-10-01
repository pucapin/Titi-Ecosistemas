

const supabaseCli = require("../services/supabase.service");

// Añadir todos los llamados con su descripción
//GET Respuestas correctas niño por ID
const getCorrectChildDB = async () => {
  const { data, error } = await supabaseCli.from('Correctas_Niño').select('id_niño');
  if (error) {
    console.error(error);
    return error;
  }
  return data;
};

module.exports = {
  getCorrectChildDB
};