const supabaseCli = require("../services/supabase.service");
const { emitEvent } = require("../services/socket.service")
console.log("emitEvent import:", typeof emitEvent);

const answerQuestionDB = async (questionId, option, childId) => {
  try {
    const { data: question, error: questionError } = await supabaseCli
      .from("Preguntas")
      .select("id, correct")
      .eq("id", questionId)
      .maybeSingle();

    if (questionError) throw questionError;
    if (!question) return { success: false, error: "Question not found" };

    const isCorrect = question.correct === option;

    const { data: insertedAnswer, error: insertError } = await supabaseCli
      .from("Respuestas")
      .insert([
        {
          id_pregunta: questionId,
          id_niño: childId,       
          respuesta: option,
          correcta: isCorrect,
        },
      ])
      .select()
      .single();

    if (insertError) throw insertError;

    await emitEvent("answer_result", {
      questionId,
      isCorrect,
      childId,
    });

    return {
      success: true,
      isCorrect,
      answer: insertedAnswer,
    };

  } catch (err) {
    console.error("Error in answerQuestionDB:", err);
    return { success: false, error: err.message };
  }
};



module.exports = {answerQuestionDB}