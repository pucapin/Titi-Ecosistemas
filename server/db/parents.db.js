
const supabaseCli = require("../services/supabase.service");

const getAllParentsDB = async () => {
  const { data, error } = await supabaseCli.from("Niño").select();
  if (error) {
    console.error(error);
    return error;
  }
  return data;
};

const createParentDB = async (user) => {
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

const updateParentDB = async (newData, userId) => {
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

const deleteParentDB = async (userId) => {
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
  getAllParentsDB,
  createParentDB,
  updateParentDB,
  deleteParentDB
};