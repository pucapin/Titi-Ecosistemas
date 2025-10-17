const {
        loginOrRegisterChildDB, 
        deleteChildDB }
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

module.exports = {
  loginOrRegisterChild,
  updateChild,
  deleteChild,
};