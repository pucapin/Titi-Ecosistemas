const express = require("express");
const {
getStationChild,
getStationsByChild,
endStation
} = require("../controllers/station_child.controller");
const router = express.Router();


router.get("/child/:childId", getStationsByChild);  // GET /stationchild/child/:childId
router.get("/:child_id", getStationChild);  // GET /stationchild/:id
router.post("/end", endStation);  // POST /stationchild/end

module.exports = router;
