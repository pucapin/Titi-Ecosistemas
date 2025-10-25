const { getAllParentsDB, 
        createParentDB, 
        updateParentDB, 
        deleteParentDB }
= require("../db/parents.db");


const getAllParents = async (req, res) => {
  const users = await getAllParentsDB();
  res.send(users);
};

const createParent = async (req, res) => {
  const { name } = req.body;
  const response = await createParentDB({ name });
  res.send(response);
};

const updateParent = async (req, res) => {
  const { name } = req.body;
  const { id: userId } = req.params;
  const response = await updateParentDB({ name }, userId);
  res.send(response);
};

const deleteParent = async (req, res) => {
  const { id: userId } = req.params;
  const response = await deleteParentDB(userId);
  res.send(response);
};

module.exports = {
  getAllParents,
  createParent,
  updateParent,
  deleteParent,
};