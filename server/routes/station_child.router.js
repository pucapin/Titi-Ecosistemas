const express = require("express");
const {
  getStationChild,
  endStation,
  getStationProgress
} = require("../controllers/station_child.controller");
const router = express.Router();


router.get("/", getStationChild);
router.post("/", endStation);
router.get("/:id", getStationProgress);

module.exports = router;
