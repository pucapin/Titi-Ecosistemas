

const supabaseCli = require("../services/supabase.service");

// Añadir todos los llamados con su descripción

// GET Checkpoint por niño
const getCheckChildDB = async () => {
  const { data, error } = await supabaseCli.from('CheckPoint_Niño').select('id_niño');
  if (error) {
    console.error(error);
    return error;
  }
  return data;
};

module.exports = {
  getCheckChildDB
};