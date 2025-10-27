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

    emitEvent("answer_result", {
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

const getAnswersByChildDB = async (childId) => {
  try {
    const { data, error } = await supabaseCli
      .from("Respuestas")
      .select(`
        id,
        respuesta,
        correcta,
        Preguntas (
          id,
          pregunta,
          opcion_a,
          opcion_b,
          opcion_c,
          opcion_d,
          correct
        )
      `)
      .eq("id_niño", childId)
      .order('id', { ascending: true });

    if (error) throw error;

    return {
      success: true,
      data: data || [],
    };

  } catch (err) {
    console.error("Error in getAnswersByChildDB:", err);
    return { success: false, error: err.message };
  }
};



module.exports = {answerQuestionDB, getAnswersByChildDB}