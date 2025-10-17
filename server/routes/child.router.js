const express = require("express");
const {
  getAllChild,
  updateChild,
  deleteChild,
  loginOrRegisterChild,
} = require("../controllers/child.controller");
const router = express.Router();


router.post("/", loginOrRegisterChild); // POST /child
router.patch("/:id", updateChild);   // PATCH /child/:id
router.delete("/:id", deleteChild);  // DELETE /child/:id

module.exports = router;
