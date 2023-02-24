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

//get 방식
const browse = function (req, res) {
  db.collection("post")
    .find()
    .sort({ _id: -1 })
    .toArray(function (err, result) {
      res.render("browse.ejs", {
        posts: result,
        pageTitle: "Gunchim",
      });
    });
};
module.exports = browse;
