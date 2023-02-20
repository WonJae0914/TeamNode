"use strict"

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
  try{
  await Question.create({
    title,
    detail,
    createdDate : Date.new,
  }); // const videos = new Video({}); /n videos.save();
}catch(err){
  return res.send('<script> alert("틀림")</script>');
}
  return res.redirect("/");
};

const getQuestionList = async (req, res) => {
  return res.render("board_upload", {
    pageTitle : "Upload Question",
  });
}

module.exports = { getQuestionList, postQuestion, home };
