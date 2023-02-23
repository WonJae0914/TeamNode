"use strict";

const { db } = require("../models/Board");
const Question = require("../models/Board");

const home = async (req, res) => {
  const questions = await Question.find({});
  return res.render("board", {
    pageTitle: "board",
    questions,
  });
};

const uploadQuestions = (req, res) => {
  return res.render("board_upload", {
    pageTitle: "Question Board",
  });
};

const postUpload = async (req, res) => {
  // const { originalname, path } =req.file;
  const { title, detail } = req.body;
  console.log(req.body);
  console.log(req.file);
  await Question.create({
    // path,
    title,
    detail,
  });
  return res.redirect("/board/list");
};

const list = async (req, res) => {
  const questions = await Question.find({ delete: false });
  return res.render("board", {
    pageTitle: "Question List",
    questions: questions,
    loggedIn: true,
  });
};

const updateQuestions = async (req, res) => {
  const questions = await Question.find({ _id: req.params.id }).exec();
  console.log("questions[0]");
  console.log(questions[0]);
  return res.render("board_update", {
    pageTitle: "Update Question",
    title: questions[0].title,
    detail: questions[0].detail,
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
    return res.redirect("/board/list");
  } catch {
    return res.render("board_update", {
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
    return res.render("board", {
      pageTitle: "Question List",
    });
  }
};

const searchQuestion = async (req, res) => {
  const { kw } = req.query;
  let questions = [];
  if (kw) {
    questions = await Question.find({
      title: {
        $regex: new RegExp(`${kw}$`, "i"),
      },
    });
  }
  return res.render("board_search", {
    pageTitle: "Search",
    questions,
    loggedIn: true,
  });
};

module.exports = {
  home,
  list,
  uploadQuestions,
  updateQuestions,
  postUpdate,
  deleteQuestions,
  postUpload,
  searchQuestion,
};
