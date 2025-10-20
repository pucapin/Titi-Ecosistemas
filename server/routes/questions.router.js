const express = require("express");

const { answerQuestion } = require("../controllers/questions.controller");

const router = express.Router();


router.post("/:questionId", answerQuestion);  
module.exports = router;
