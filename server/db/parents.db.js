
const supabaseCli = require("../services/supabase.service");

function generateJoinCode(length = 6) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

async function generateUniqueJoinCode() {

  const code = generateJoinCode(6);

  const { data, error } = await supabaseCli
    .from("Padre")
    .select('*')
    .eq("join_code", code)
    .maybeSingle();

  if (error) {
    console.error("Error checking code uniqueness:", error);
    throw error;
  }
  if (data) {
    return generateUniqueJoinCode();
  }
  return code;
}

const loginOrRegisterParentDB = async (username, password) => {
  try {
    // user existe??
    const { data: existingUser, error: selectError } = await supabaseCli
      .from("Padre")
      .select("*")
      .eq("name", username)
      .eq("contraseña", password)
      .maybeSingle();

    if (selectError) throw selectError;

    // USER EXISTE!!!!1
    if (existingUser) {
      return {
        status: 200,
        message: "User logged in",
        user: existingUser,
      };
    }

    // GENERAR CODIGO PARA NIÑO
    const joinCode = await generateUniqueJoinCode();

    // CREAR NUEVO PADRE!!!!! si no existe
    const { data: newUser, error: insertError } = await supabaseCli
      .from("Padre")
      .insert([{ name: username, contraseña: password, join_code: joinCode }])
      .select()
      .single();

    if (insertError) throw insertError;

    return {
      status: 201,
      message: "User registered",
      user: newUser,
    };
  } catch (err) {
    console.error("Server error:", err);
    return { status: 500, error: err.message };
  }
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
  loginOrRegisterParentDB,
  updateParentDB,
  deleteParentDB
};