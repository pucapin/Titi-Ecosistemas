const express = require("express");

const {
        updateParent, 
        deleteParent, 
        loginOrRegisterParent}
= require("../controllers/parents.controller");
const router = express.Router();


router.post("/", loginOrRegisterParent); // POST /parents
router.patch("/:id", updateParent);   // PATCH /parents/:id
router.delete("/:id", deleteParent);  // DELETE /parents/:id

module.exports = router;