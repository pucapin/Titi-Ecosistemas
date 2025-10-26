const {
        loginOrRegisterChildDB, 
        deleteChildDB,
        updateChildPointsDB }
 = require("../db/child.db");


const loginOrRegisterChild = async (req, res) => {
  const { username, code } = req.body;
  const response = await loginOrRegisterChildDB(username, code);
  res.send(response);
};


const updateChild = async (req, res) => {
  const { name } = req.body;
  const { id: userId } = req.params;
  const response = await updateChildDB({ name }, userId);
  res.send(response);
};

const deleteChild = async (req, res) => {
  const { id: userId } = req.params;
  const response = await deleteChildDB(userId);
  res.send(response);
};

const updateChildPoints = async (req, res) => {
  try {
    const { id: childId } = req.params;
    const { points } = req.body;
    
    if (!points && points !== 0) {
      return res.status(400).json({ 
        success: false, 
        error: "Points are required" 
      });
    }

    const response = await updateChildPointsDB(childId, points);
    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      success: false, 
      error: err.message 
    });
  }
};

module.exports = {
  loginOrRegisterChild,
  updateChild,
  deleteChild,
  updateChildPoints,
};