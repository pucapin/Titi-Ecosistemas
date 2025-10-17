
const supabaseCli = require("../services/supabase.service");
// Añadir todos los llamados con su descripción


const loginOrRegisterChildDB = async (username, code) => {
  try {
    // hay un padre con el join code?????
    const { data: parent, error: parentError } = await supabaseCli
      .from("Padre")
      .select("id, join_code")
      .eq("join_code", code.trim())
      .maybeSingle();

    if (parentError) throw parentError;

    if (!parent) {
      return {
        status: 404,
        error: "No parent found with that join code.",
      };
    }

    // ya existe un niño con el parent id?
    const { data: existingChild, error: selectError } = await supabaseCli
      .from("Niño")
      .select("*")
      .eq("name", username)
      .eq("id_padre", parent.id)
      .maybeSingle();

    if (selectError) throw selectError;

    // si el niño ya existe se hace log in
    if (existingChild) {
      return {
        status: 200,
        message: "Child logged in",
        user: existingChild,
      };
    }

    // si no existe se crea uno nuevo con el parent id como "contraseña"
    const { data: newChild, error: insertError } = await supabaseCli
      .from("Niño")
      .insert([
        {
          name: username,
          id_padre: parent.id,
        },
      ])
      .select()
      .single();
    
    if (insertError) throw insertError;
    
    const { data: updatedParent, error: updateError } = await supabaseCli
    .from("Padre")
    .update({ id_niño: newChild.id })  // or children: supabaseCli.arrayAppend('children', newChild.id)
    .eq("id", parent.id)
    .select()
    .single();
    if(updateError) throw updateError;

    return {
      status: 201,
      message: "Child registered",
      user: newChild,
      parent: updatedParent,
    };

  } catch (err) {
    console.error("Server error:", err);
    return { status: 500, error: err.message };
  }
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
  loginOrRegisterChildDB,
  deleteChildDB
};