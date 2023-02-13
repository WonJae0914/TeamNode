const express = require("express");
const {
  getQuestionList,
  postQuestion,
  home
} = require("../controller/boardController");

const globalRouter = express.Router();

globalRouter.get("/", home);

// boardRouter.route("/").get(getQuestionList).post(postQuestion);

module.exports = globalRouter;
