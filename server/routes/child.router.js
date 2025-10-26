const express = require("express");
const {
  updateChild,
  deleteChild,
  loginOrRegisterChild,
  updateChildPoints,
} = require("../controllers/child.controller");
const router = express.Router();


router.post("/", loginOrRegisterChild); // POST /child
router.patch("/:id", updateChild);   // PATCH /child/:id
router.patch("/:id/points", updateChildPoints);   // PATCH /child/:id/points
router.delete("/:id", deleteChild);  // DELETE /child/:id

module.exports = router;