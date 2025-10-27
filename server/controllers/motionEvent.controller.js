const { emitEvent } = require("../services/socket.service");

async function motionController(req, res) {
  const { acceleration } = req.body;
  console.log("Motion received:", acceleration);
  await emitEvent("jumpUp", { acceleration });

  // Maybe store in DB or trigger socket event
  res.json({ ok: true });
}

module.exports = {
  motionController
};