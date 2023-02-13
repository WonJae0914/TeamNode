const board = require("../models/Board");

const getQuestionList = (req, res) => {
  //   return res.render("question_list", { pageTitle: "Question List" });
  res.send("Get Question");
};

const postQuestion = (req, res) => {};

module.exports = { getQuestionList, postQuestion };
