"use strict"
const fs = require("fs");
const path = require("path");
const User = require("../models/User")
const passport = require("../config/passport")


const MongoClient = require('mongodb-legacy').MongoClient;

let db;

MongoClient.connect("mongodb+srv://kdKim:6r7r6e5!KD@cluster0.mo9rckf.mongodb.net/?retryWrites=true&w=majority"
    , { useNewUrlParser: true },
    function (err, client) {
        if (err) { return console.log('DB연결 실패'); }
        db = client.db('test');
        console.log("몽고디비 연결 성공");
    });

const watch = async (req, res) =>{ 
  const id = parseInt(req.params.id);
  const user = req.user;

  // 로그인한 유저 DB정보 가져오기
  const userInfo = await User.findOne({
    id : user.id,
  })
  console.log("확인1 : " + userInfo.bookmark);
  // 클릭한 컨텐츠 DB 정보 가져오기
  const result = await db.collection("post").findOne({
    _id : id
  })
  console.log("확인2 : " + result.제목);
  // 유저의 컨텐츠스코어 DB정보 가져오기
  const result2 = await db.collection("contentScore").findOne({
    title : result.제목
  });
  console.log("확인3 : " + JSON.stringify(result2));
  console.log(result2.length);
  const result3 = function() {
    let sumScore = 0;
    let avg = 0;
    let cnt = 1;
    for(let i=0; i<result2.score.length; i++){
      console.log("스코어갯수 : " + result2.score.length);
      sumScore += result2.score[i];
      cnt += [i];
    }
      console.log("확인4 : " + cnt);
      console.log("확인5 : " + sumScore);
      avg = sumScore/cnt;
      return avg;
    }
  console.log("확인6 : " + result3());

  res.render("watch", { 
    posts : result,
    title : userInfo.bookmark,
    score : result2
  })

}



module.exports = watch; 