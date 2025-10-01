const express = require("express");
const {
getCheckpoint
} = require("../controllers/checkpoint.controller");
const router = express.Router();


router.get("/:id", getCheckpoint);  // GET /checkpoint/:id

module.exports = router;
