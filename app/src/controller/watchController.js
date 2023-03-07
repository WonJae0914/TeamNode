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
  // 클릭한 컨텐츠 DB 정보 가져오기
  const result = await db.collection("post").findOne({
    _id : id
  })
  // 해당 컨텐츠의 컨텐츠스코어 DB정보 가져오기
  const result2 = await db.collection("contentScore").find({
    title : result.제목
  }).toArray();
  console.log(result2);

  // 해당 컨텐츠에 유저가 평가한 점수 가져오기
  function userScore(){
    for(let i=0; i<result2.length; i++){
      if(result2[i].userId == user.id && result2[i].title == result.제목){
        return result2[i].score
      }
    }
  }
  // 컨텐츠 조회수 
  const post = await db.collection("post").findOne({_id : id});
  let views = post.view;
  if(isNaN(views)){
    views = 0;
  }
  views += 1;
  const postUpate = await db.collection("post").updateOne(
    {_id : id},
    { $set : {view : parseInt(views)}}
  )
  
  

  // 유저의 컨텐츠스코어 DB 개수
  const contentCnt = await db.collection("contentScore")
                  .countDocuments({title: result.제목, score: {"$exists": true}})
  // 별점 평균 내기

  let avg = 0;

  const scoreAvg = function() {
    let sumScore = 0;
    let notNum = 0;
    for(let i=0; i<contentCnt; i++){
      sumScore += result2[i].score;
    }
    avg = sumScore/contentCnt;
    return isNaN(avg) ? notNum : avg
  }

  res.render("watch", { 
    posts : result,
    title : userInfo.bookmark,
    score : userScore(),
    avg : scoreAvg()
  })

}



module.exports = watch; 