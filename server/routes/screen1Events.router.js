const express = require("express");
const router = express.Router();
const {
  motionController,
} = require("../controllers/motionEvent.controller");

router.post("/motion", motionController);

module.exports = router;