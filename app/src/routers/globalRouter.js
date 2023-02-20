
const express = require("express");
const { output } = require("../controller/browseController");
const userRouter = require("./userRouter");
const {
  getQuestionList,
  postQuestion,
  home
} = require("../controller/boardController");
const globalRouter = express.Router();

globalRouter.get("/board", home);
globalRouter.get("/browse" , output.browse);
globalRouter.get("/user", userRouter);
// boardRouter.route("/").get(getQuestionList).post(postQuestion);

module.exports = globalRouter;
