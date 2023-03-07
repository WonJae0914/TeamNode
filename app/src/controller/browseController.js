"use strict";

const MongoClient = require("mongodb-legacy").MongoClient;

let db;
MongoClient.connect(
  "mongodb+srv://kdKim:6r7r6e5!KD@cluster0.mo9rckf.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true },
  function (err, client) {
    if (err) {
      return console.log("DB연결 실패");
    }
    db = client.db("test");
    console.log("몽고디비 연결 성공");
  }
);

// 화면 띄우기 get
const browse = function (req, res) {
  db.collection("post")
    .find()
    .sort({ _id: -1 })
    .toArray(function (err, result) {
      res.render("browse", {
        posts: result });
    });
};

// 검색 get
const search = async (req, res) => {
  const { seachwd } = req.query;
  console.log(seachwd);
  const result = await db.collection("post")
    .find({
      $or : [
        {장르 : {$regex: new RegExp(seachwd, "i")}}, // 정규식 : 부분검색O, 대소문자 구분X
        {감독 : {$regex: new RegExp(seachwd, "i")}},
        {주연 : {$regex: new RegExp(seachwd, "i")}},
        {제목 : {$regex: new RegExp(seachwd, "i")}}
      ]})
    .sort({ _id: -1 })
    .toArray()
  console.log(result);
  res.render("browse_search", {
      searchdb: result })
};

module.exports = {
  browse,
  search
};