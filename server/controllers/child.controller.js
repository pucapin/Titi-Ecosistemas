const { getAllChildDB, 
        createChildDB, 
        updateChildDB, 
        deleteChildDB }
 = require("../db/child.db");

const getAllChild = async (req, res) => {
  const users = await getAllChildDB();
  res.send(users);
};

const createChild = async (req, res) => {
  const { name } = req.body;
  const response = await createChildDB({ name });
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

module.exports = {
  getAllChild,
  createChild,
  updateChild,
  deleteChild,
};