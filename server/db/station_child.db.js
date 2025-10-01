

const supabaseCli = require("../services/supabase.service");
// Añadir todos los llamados con su descripción
// GET Estacion por ID niño
const getStationChildDB = async () => {
  const { data, error } = await supabaseCli.from('Estacion_Niño').select('id_niño');
  if (error) {
    console.error(error);
    return error;
  }
  return data;
};

module.exports = {
  getStationChildDB
};