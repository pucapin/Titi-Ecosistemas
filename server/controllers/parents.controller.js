const { 
        loginOrRegisterParentDB, 
        updateParentDB,
        getChildParentDB, 
        deleteParentDB }
= require("../db/parents.db");


//login o registro
const loginOrRegisterParent = async (req, res) => {
  const { username, password } = req.body;
  const response = await loginOrRegisterParentDB(username, password);
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
  loginOrRegisterParent,
  updateParent,
  deleteParent,
};