"use strict";

const Question = require("../models/Board");

const home = (req, res) => {
  return res.render("board", {
    pageTitle: "Board",
    loggedIn: false,
  });
};

const uploadQuestions = (req, res) => {
  return res.render("board_upload", {
    pageTitle: "Upload Question",
  });
};

const postUpload = async (req, res) => {
  // const { originalname, path } =req.file;
  const { title, description, hashtags } = req.body;
  console.log(req.body);
  console.log(req.file);
  await Question.create({
    // path,
    title,
    description,
    hashtags: hashtags.split(",").map((word) => `#${word}`),
  });
  return res.redirect("/questions/list");
};

const list = async (req, res) => {
  const questions = await Question.find({ delete: false });
  console.log(questions);
  return res.render("board", {
    pageTitle: "Question List",
    questions: questions,
    loggedIn: true,
  });
};

const updateQuestion = async (req, res) => {
  const boardId = req.params.id;
  console.log(boardId);
  return res.redirect(`/questions/${boardId}/update`);
};

const updateQuestions = async (req, res) => {
  const questions = await Question.find({ _id: req.params.id }).exec();
  console.log("questions[0]");
  console.log(questions[0]);
  return res.render("board_update", {
    pageTitle: "Update Question",
    title: questions[0].title,
    description: questions[0].description,
    hashtags: questions[0].hashtags,
  });
};

const postUpdate = async (req, res) => {
  const updateBoard = req.body;
  console.log("updateBoard");
  console.log(updateBoard);
  try {
    const questions = await Question.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updateBoard },
      { returnOriginal: false }
    );
    console.log("questions");
    console.log(questions);
    if (!questions) {
      return res.status(404).send("Board not found");
    }
    return res.redirect("/questions/list");
  } catch {
    return res.render("update", {
      pageTitle: "Update Question",
    });
  }
};

const deleteQuestions = async (req, res) => {
  try {
    const questions = await Question.findOneAndUpdate(
      { _id: req.params.id },
      { delete: true },
      { returnOriginal: false }
    );
    return res.redirect("/board/list");
  } catch {
    return res.render("list", {
      pageTitle: "Question List",
    });
  }
};

const postDelete = async (req, res) => {};

module.exports = {
  home,
  list,
  uploadQuestions,
  updateQuestion,
  updateQuestions,
  postUpdate,
  postDelete,
  deleteQuestions,
  postUpload,
};
