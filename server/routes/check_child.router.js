const express = require("express");
const {
getCheckChild
} = require("../controllers/check_child.controller");
const router = express.Router();


router.get("/:child_id", getCheckChild);  // GET /point_child/:id

module.exports = router;
