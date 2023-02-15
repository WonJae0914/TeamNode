
const express = require("express");
const { output } = require("../controller/browseController");
const {
  getQuestionList,
  postQuestion,
  home
} = require("../controller/boardController");
const globalRouter = express.Router();

globalRouter.get("/board", home);
globalRouter.get("/browse" , output.browse);
// boardRouter.route("/").get(getQuestionList).post(postQuestion);

module.exports = globalRouter;
