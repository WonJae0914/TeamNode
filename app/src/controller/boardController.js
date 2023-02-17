const Question = require("../models/Board");



const home = async (req, res) => {
  const questions = await Question.find({});
  return res.render("board", {
    pageTitle : "board",
    loggedIn : true,
    questions
  });
}

const postQuestion = async (req, res) => {
  const { title, detail} = req.body;
  console.log(req.body);
  await Question.create({
    title,
    detail,
    createdDate : Date.new,
  }); // const videos = new Video({}); /n videos.save();
  return res.redirect("/");
};

const getQuestionList = async (req, res) => {
  return res.render("upload", {
    pageTitle : "Upload Question",
  });
}

module.exports = { getQuestionList, postQuestion, home };
