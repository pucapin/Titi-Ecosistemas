const express = require("express");
const {
getStationChild,
endStation
} = require("../controllers/station_child.controller");
const router = express.Router();


router.get("/:child_id", getStationChild);  // GET /sation_child/:id
router.post("/end", endStation);  // GET /sation_child/:id

module.exports = router;
