const { getCorrectChildDB } = require('../db/correct_child.db');

const getCorrectChild = async (req, res) => {
  try {
    const data = await getCorrectChildDB();
    res.json(data);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getCorrectChild };
