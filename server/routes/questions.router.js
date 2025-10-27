const express = require("express");

const { answerQuestion, getAnswersByChild } = require("../controllers/questions.controller");

const router = express.Router();


router.post("/:questionId", answerQuestion);  
router.get("/child/:childId", getAnswersByChild);

module.exports = router;
