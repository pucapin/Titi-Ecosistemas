const { answerQuestionDB } = require('../db/questions.db');


const answerQuestion = async (req, res) => {
  try {
    const { questionId } = req.params;
    const { option } = req.body; 
    const result = await answerQuestionDB(questionId, option);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { answerQuestion };
