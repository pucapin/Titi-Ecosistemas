const express = require("express");
const {
getStations
} = require("../controllers/stations.controller");
const router = express.Router();


router.get("/", getStations);  // GET /stations

module.exports = router;
