const express = require("express");
const {
  getAllChild,
  createChild,
  updateChild,
  deleteChild,
} = require("../controllers/child.controller");
const router = express.Router();


router.get("/", getAllChild);          // GET /child
router.post("/", createChild);       // POST /child
router.patch("/:id", updateChild);   // PATCH /child/:id
router.delete("/:id", deleteChild);  // DELETE /child/:id

module.exports = router;
