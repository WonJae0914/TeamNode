"use strict";

const express = require("express");
const {
  postUpload,
  uploadQuestions,
  list,
  updateQuestions,
  postUpdate,
  detailQuestion,
  deleteQuestions,
  searchQuestion,
  postComment,
} = require("../controller/boardController");

const boardRouter = express.Router();

boardRouter.route("/upload").get(uploadQuestions).post(postUpload); // board/upload
boardRouter.route("/:id/detail").get(detailQuestion).post(postComment); // board/:id/detail
boardRouter.route("/:id/update").get(updateQuestions).post(postUpdate); // board/:id/update
boardRouter.route("/:id/delete").get(deleteQuestions); // board/:id/delete
boardRouter.route("/search/:page(\\d+)").get(searchQuestion); // board/:id/search
boardRouter.route("/list/:page(\\d+)").get(list); // board/list

module.exports = boardRouter;
