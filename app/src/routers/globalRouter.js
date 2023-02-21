const express = require("express");
const browse = require("../controller/browseController");
const userRouter = require("./userRouter");
const boardRouter = require("./boardRouter");

const globalRouter = express.Router();

globalRouter.use("/board", boardRouter);
globalRouter.get("/browse", browse);
globalRouter.get("/user", userRouter);
// boardRouter.route("/").get(getQuestionList).post(postQuestion);

module.exports = globalRouter;
