const express = require("express");
const {
getCheckpoint,
getCheckpointQuestion,
showCheckpoint
} = require("../controllers/checkpoint.controller");
const router = express.Router();


router.get("/:id", getCheckpoint);  // GET /checkpoint/:id
router.get("/question/:checkpointId", getCheckpointQuestion); // GET the checkpoint question
router.post("/show/:checkpointId", showCheckpoint); // GET the checkpoint question


module.exports = router;
