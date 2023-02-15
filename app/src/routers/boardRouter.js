const express = require("express");
const {
  getQuestionList,
  postQuestion,
} = require("../controller/boardController");

const boardRouter = express.Router();

boardRouter.route("/question").get(getQuestionList).post(postQuestion);

module.exports = boardRouter;
