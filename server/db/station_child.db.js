
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

const endStationDB = async (childId, stationId, completed, correctas) => {
  const { data, error } = await supabaseCli
    .from("Estacion_Niño")
    .insert([
      {
        id_niño: childId,
        id_estacion: stationId,
        completed,
        correctas,
      },
    ])
    .select();
  if (error) throw error;
  return data;
};

const getStationProgressDB = async (childId) => {
  try {
    const { data, error } = await supabaseCli
      .from("Estacion_Niño")
      .select("*, Estacion(name)")
      .eq("id_niño", childId);

    if (error) throw error;

    return {
      success: true,
      data: data
    };
  } catch (err) {
    console.error("Error fetching station progress:", err);
    return {
      success: false,
      error: err.message
    };
  }
};

module.exports = {
  getStationChildDB,
  endStationDB,
  getStationProgressDB
};