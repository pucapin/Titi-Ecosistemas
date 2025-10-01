const express = require("express");
const {
getStationChild
} = require("../controllers/station_child.controller");
const router = express.Router();


router.get("/:child_id", getStationChild);  // GET /sation_child/:id

module.exports = router;
