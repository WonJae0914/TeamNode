const express = require("express");
const {getQuestionList, postQuestion} = require("../controller/qnaController");

const boardRouter = express.Router();

boardRouter.route("/question").get(getQuestionList).post(postQuestion); 

module.exports = boardRouter;