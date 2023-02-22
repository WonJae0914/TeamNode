
const express = require("express")
const browse = require("../controller/browseController");
const passport = require("../config/passport");
const userRouter = require("./userRouter");
const {
  getQuestionList,
  postQuestion,
  home
} = require("../controller/boardController");
const globalRouter = express.Router();

globalRouter.get("/board", home);
globalRouter.get("/browse" , browse);
globalRouter.get("/user", userRouter);
// boardRouter.route("/").get(getQuestionList).post(postQuestion);

module.exports = globalRouter;
