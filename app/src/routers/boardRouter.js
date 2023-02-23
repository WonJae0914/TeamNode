"use strict";

const express = require("express");
const {
  postUpload,
  uploadQuestions,
  list,
  updateQuestions,
  postUpdate,
  deleteQuestions,
  searchQuestion,
} = require("../controller/boardController");

const boardRouter = express.Router();

boardRouter.route("/upload").get(uploadQuestions).post(postUpload); // board/upload
boardRouter.route("/list").get(list); // board/list
boardRouter.route("/:id/update").get(updateQuestions).post(postUpdate); // board/:id/update
boardRouter.route("/:id/delete").get(deleteQuestions); // board/:id/delete
boardRouter.route("/search").get(searchQuestion); // board/:id/search

module.exports = boardRouter;
