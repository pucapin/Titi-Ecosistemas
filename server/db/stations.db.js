
const supabaseCli = require("../services/supabase.service");
// Añadir todos los llamados con su descripción
// GET todas las estaciones
const getStationsDB = async () => {
  const { data, error } = await supabaseCli.from('Estacion').select();
  if (error) {
    console.error(error);
    return error;
  }
  return data;
};

module.exports = {
  getStationsDB
};