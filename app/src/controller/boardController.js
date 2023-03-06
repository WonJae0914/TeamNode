"use strict";

const { db } = require("../models/Board");
const Question = require("../models/Board");

// const home = async (req, res) => {
//   const questions = await Question.find({});
//   return res.render("board", {
//     pageTitle: "board",
//     questions,
//   });
// };

const uploadQuestions = (req, res) => {
  const loggedIn = req.user;
  console.log("loggedIn info");
  console.log(loggedIn);
  return res.render("board_upload", {
    pageTitle: "Question Upload",
  });
};

const postUpload = async (req, res) => {
  // const { originalname, path } = req.file;
  const { title, detail } = req.body;
  console.log(req.body);
  console.log(req.file);
  await Question.create({
    // path,
    title,
    detail,
  });
  return res.redirect("/board/list/1");
};

const list = async (req, res) => {
  const PAGE_SIZE = 6;
  const MAX_PAGE = 5;

  const pageNumber = req.params.page;
  const currentPage = parseInt(pageNumber);

  const startPage = Math.floor((currentPage - 1) / MAX_PAGE) * MAX_PAGE + 1;
  const endPage = startPage + MAX_PAGE - 1;

  const totQuestions = await Question.find({ delete: false });
  const questions = await Question.find({ delete: false })
    .sort({ createdDate: -1 })
    .skip((pageNumber - 1) * PAGE_SIZE)
    .limit(PAGE_SIZE);

  const totalPages = Math.ceil(totQuestions.length / PAGE_SIZE);
  console.log(totalPages);
  console.log(totQuestions.length);

  return res.render("board", {
    questions: questions,
    pageTitle: "Question List",
    total: totalPages,
    max: MAX_PAGE,
    currentPage: currentPage,
    startPage: startPage,
    endPage: endPage,
    // loggedIn: true,
  });
};

const detailQuestion = async (req, res) => {
  const questions = await Question.find({ _id: req.params.id }).exec();
  console.log("questions[0]");
  console.log(questions[0]);
  return res.render("board_detail", {
    title: questions[0].title,
    detail: questions[0].detail,
    pageTitle: "Question Detail",
  });
};

const updateQuestions = async (req, res) => {
  const questions = await Question.find({ _id: req.params.id }).exec();
  console.log("questions[0]");
  console.log(questions[0]);
  return res.render("board_update", {
    title: questions[0].title,
    detail: questions[0].detail,
    pageTitle: "Question Update",
  });
};

const postUpdate = async (req, res) => {
  const updateBoard = req.body;
  console.log("updateBoard");
  console.log(updateBoard);
  try {
    const questionIdx = Question.find;
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
    return res.redirect("/board/list/1");
  } catch {
    return res.render("board_update");
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
    return res.render("board");
  }
};

const searchQuestion = async (req, res) => {
  const { kw } = req.query;
  let questions = [];
  if (kw) {
    questions = await Question.find({
      title: {
        $regex: new RegExp(`${kw}`, "i"),
      },
    });
  }
  return res.render("board_search", {
    questions,
    loggedIn: true,
    pageTitle: "Search Results",
  });
};

module.exports = {
  list,
  uploadQuestions,
  detailQuestion,
  updateQuestions,
  postUpdate,
  deleteQuestions,
  postUpload,
  searchQuestion,
};
