"use strict"

const express = require("express");
const {
  getQuestionList,
  postQuestion,
  home,
} = require("../controller/boardController");
const boardRouter = express.Router(); 
 
boardRouter.get("/", home);
boardRouter.route("/question").get(getQuestionList).post(postQuestion);

module.exports = boardRouter;
