const board = require("../models/Board");
const content = require("../models/Content");

const getContentList = (req, res) => {
  //   return res.render("question_list", { pageTitle: "Question List" });
  res.send("Get Content");
};

const postContent = (req, res) => {};

module.exports = { getContentList, postContent };
