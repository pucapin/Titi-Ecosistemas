const { getCheckpointDB, getQuestionDB } = require('../db/checkpoint.db');

const getCheckpoint = async (req, res) => {
  try {
    const data = await getCheckpointDB();
    res.json(data);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: err.message });
  }
};

const getCheckpointQuestion = async (req, res) => {
  const {checkpointId} = req.params;
  try {
    const data = await getQuestionDB(checkpointId);
    res.json(data);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: err.message });
  }
};


module.exports = { getCheckpoint, getCheckpointQuestion,};
