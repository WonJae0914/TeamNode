"use strict";

const { db } = require("../models/Board");
const Question = require("../models/Board");

const PAGE_SIZE = 6;
const MAX_PAGE = 5;

// board list get 요청 함수
const list = async (req, res) => {
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
    totalPages: totalPages,
    max: MAX_PAGE,
    currentPage: currentPage,
    startPage: startPage,
    endPage: endPage,
    questionNum: totQuestions.length,
    // loggedIn: true,
  });
};

// board uplaod get 요청 함수
const uploadQuestions = (req, res) => {
  const loggedIn = req.user;
  return res.render("board_upload", {
    pageTitle: "Question Upload",
  });
};

// board uplaod post 요청 함수
const postUpload = async (req, res) => {
  const { title, detail } = req.body;
  await Question.create({
    title,
    detail,
  });
  return res.redirect("/board/list/1");
};

// board detail get 요청 함수
const detailQuestion = async (req, res) => {
  const id = req.params.id;
  const questions = await Question.find({ _id: id }).exec();
  let numOfViews = questions[0].views + 1;
  await Question.findByIdAndUpdate(
    { _id: id },
    { $set: { views: numOfViews } },
    { returnOriginal: false }
  ).exec();
  return res.render("board_detail", {
    title: questions[0].title,
    detail: questions[0].detail,
    pageTitle: "Question Detail",
    comments: questions[0].comments,
  });
};

// board detail get 요청 함수 (댓글 작성)
const postComment = async (req, res) => {
  const { comment } = req.body;
  const questionId = req.params.id;
  // try {
  const uploadComments = await Question.findOneAndUpdate(
    { _id: req.params.id },
    { $addToSet: { comments: comment } },
    { returnOriginal: false }
  );
  if (!uploadComments) {
    return res.status(404).send("No comments yet");
  }
  return res.redirect(`/board/${questionId}/detail`);
  // } catch {
  //   return res.render("board_detail", {
  //     pageTitle: "Question Detail",
  //     title
  //   });
  // }
};

// board update get 요청 함수
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

// board upload post 요청 함수
const postUpdate = async (req, res) => {
  const updateBoard = req.body;
  try {
    await Question.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updateBoard },
      { returnOriginal: false }
    );
    return res.redirect(`/board/list/1`);
  } catch (err) {
    console.log(err);
    return res.status(404).send("에러 발생, 문의 게시판에 문의주쇼");
  }
};

// 게시글 삭제 get 요청 함수 (db에서 삭제되는건 아님, delete 컬럼을 true로 변경)
const deleteQuestions = async (req, res) => {
  try {
    await Question.findOneAndUpdate(
      { _id: req.params.id },
      { delete: true },
      { returnOriginal: false }
    );
    return res.redirect("back"); // 함수를 요청한 페이지로 redirect
  } catch (err) {
    console.log(err);
    return res.redirect("back");
  }
};

// board search get 요청 함수
const searchQuestion = async (req, res) => {
  // 상수는 최상단에 선언
  const { kw } = req.query; // url에서 query값을 사용하여 검색값을 받아옴
  const pageNumber = req.params.page;
  const currentPage = parseInt(pageNumber);

  const startPage = Math.floor((currentPage - 1) / MAX_PAGE) * MAX_PAGE + 1; // paging 기준점
  const endPage = startPage + MAX_PAGE - 1;

  const totQuestions = await Question.find({
    // 검색된 전체 게시물
    title: {
      $regex: new RegExp(`${kw}`, "i"), // 정규 표현식, 대소문자 구분 무시
    },
    delete: false, // 삭제된 함수는 검색하지 않음
  });
  const totalPages = Math.ceil(totQuestions.length / PAGE_SIZE); // 전체 페이지 수
  let questions = [];
  if (kw) {
    questions = await Question.find({
      title: {
        $regex: new RegExp(`${kw}`, "i"),
      },
      delete: false,
    })
      .sort({ createdDate: -1 }) // 최신순으로 정렬
      .skip((pageNumber - 1) * PAGE_SIZE) // 해당 페이지 이전 게시물 스킵
      .limit(PAGE_SIZE); // 페이지 당 게시물 개수 제한
  }
  return res.render("board_search", {
    questions,
    loggedIn: true,
    pageTitle: "Search Results",
    total: totalPages,
    max: MAX_PAGE,
    currentPage: currentPage,
    startPage: startPage,
    endPage: endPage,
    questionNum: totQuestions.length,
    kw,
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
  postComment,
};
