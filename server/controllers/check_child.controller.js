const { getCheckChildDB } = require('../db/check_child.db');

const getCheckChild = async (req, res) => {
  try {
    const data = await getCheckChildDB();
    res.json(data);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getCheckChild };
