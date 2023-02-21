"use strict";

const express = require("express");
const {
  postUpload,
  uploadQuestions,
  list,
  updateQuestion,
  updateQuestions,
  postUpdate,
  deleteQuestions,
} = require("../controller/boardController");
const boardRouter = express.Router();

boardRouter.route("/upload").get(uploadQuestions).post(postUpload); // videos/upload
boardRouter.route("/list").get(list).post(updateQuestion); // videos/list
boardRouter.route("/:id/update").get(updateQuestions).post(postUpdate); // videos/edit
boardRouter.route("/:id/delete").get(deleteQuestions); // videos/edit

module.exports = boardRouter;
