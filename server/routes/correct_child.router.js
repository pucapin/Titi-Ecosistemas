const express = require("express");
const {
getCorrectChild
} = require("../controllers/correct_child.controller");
const router = express.Router();


router.get("/:child_id", getCorrectChild);  // GET /correct_child/:id

module.exports = router;
