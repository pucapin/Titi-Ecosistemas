const express = require("express");

const { getAllParents,
        createParent, 
        updateParent, 
        deleteParent }
= require("../controllers/parents.controller");
const router = express.Router();


router.get("/", getAllParents);          // GET /parents
router.post("/", createParent);       // POST /parents
router.patch("/:id", updateParent);   // PATCH /parents/:id
router.delete("/:id", deleteParent);  // DELETE /parents/:id

module.exports = router;
