const express = require("express");
const {
  getQuestionList,
  postQuestion,
} = require("../controller/boardController");

const globalRouter = express.Router();

// boardRouter.route("/").get(getQuestionList).post(postQuestion);

module.exports = globalRouter;
