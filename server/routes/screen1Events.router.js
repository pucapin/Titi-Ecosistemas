const express = require("express");
const router = express.Router();
const {
  motionController,
} = require("../controllers/screen1Events.controller");

router.post("/motion", motionController);

module.exports = router;