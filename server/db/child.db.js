
const supabaseCli = require("../services/supabase.service");
// Añadir todos los llamados con su descripción

const getAllChildDB = async () => {
  const { data, error } = await supabaseCli.from("Niño").select();
  if (error) {
    console.error(error);
    return error;
  }
  return data;
};

const createChildDB = async (user) => {
  const { data, error } = await supabaseCli
    .from("Niño")
    .insert([user])
    .select();

  if (error) {
    console.error(error);
    return error;
  }

  return data;
};

const updateChildDB = async (newData, userId) => {
  const { data, error } = await supabaseCli
    .from("Niño")
    .update(newData)
    .eq("id", userId)
    .select();

  if (error) {
    console.error(error);
  }

  return data;
};

const deleteChildDB = async (userId) => {
  const { data, error } = await supabaseCli
    .from("Niño")
    .delete()
    .eq("id", userId)
    .select();

  if (error) {
    console.error(error);
  }

  return data;
};

module.exports = {
  getAllChildDB,
  createChildDB,
  updateChildDB,
  deleteChildDB
};