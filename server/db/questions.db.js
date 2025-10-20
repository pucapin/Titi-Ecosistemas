const supabaseCli = require("../services/supabase.service");
const { emitEvent } = require("../services/socket.service")
console.log("emitEvent import:", typeof emitEvent);

const answerQuestionDB = async (id, letter) => {
// fetch pregunta y correct
  const { data: question, error } = await supabaseCli
  .from("Preguntas")
  .select("id, correct")
  .eq("id", id)
  .maybeSingle();
  
  if (error) {
    console.error("Error fetching question:", error.message);
    return { success: false, error: error.message };
  }

  if (!question) {
    return { success: false, error: "Question not found" };
  }
  // 
  const isCorrect = question.correct === letter;

  emitEvent("answer_result", { questionId: id, isCorrect });
  // pendiente emitir el cambio en la información del usuario.

  return { success: true, isCorrect };
}

module.exports = {answerQuestionDB}