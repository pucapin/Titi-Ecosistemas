const { getCheckpointDB, getQuestionDB } = require('../db/checkpoint.db');
const { emitEvent } = require("../services/socket.service");

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

const showCheckpoint = async (req, res) => {
  const { checkpointId } = req.params;
  console.log("Show Checkpoint", checkpointId);
  emitEvent("showQuestion", checkpointId);
  res.json({ ok: true });
}

module.exports = { getCheckpoint, getCheckpointQuestion, showCheckpoint};
