const { getCheckpointDB } = require('../db/checkpoint.db');

const getCheckpoint = async (req, res) => {
  try {
    const data = await getCheckpointDB();
    res.json(data);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getCheckpoint };
