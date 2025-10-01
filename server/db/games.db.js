
const supabaseCli = require("../services/supabase.service");
// Añadir todos los llamados con su descripción
// GET Todos los juegos
const getGamesDB = async () => {
  const { data, error } = await supabaseCli.from('Juego').select();
  if (error) {
    console.error(error);
    return error;
  }
  return data;
};
// GET Juego por ID niño
const getGameByChildDB = async () => {
  const { data, error } = await supabaseCli.from('Juego').select('id_niño');
  if (error) {
    console.error(error);
    return error;
  }
  return data;
};

module.exports = {
  getGamesDB,
  getGameByChildDB
};