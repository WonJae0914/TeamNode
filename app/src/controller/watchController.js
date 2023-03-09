"use strict"
const fs = require("fs");
const path = require("path");
const User = require("../models/User")
const passport = require("../config/passport")
const reviewCnt = require("../controller/reviewController")

const MongoClient = require('mongodb-legacy').MongoClient;

let db;

MongoClient.connect("mongodb+srv://kdKim:6r7r6e5!KD@cluster0.mo9rckf.mongodb.net/?retryWrites=true&w=majority"
    , { useNewUrlParser: true },
    function (err, client) {
        if (err) { return console.log('DB연결 실패'); }
        db = client.db('test');
    });

const watch = async (req, res) =>{ 
  const id = parseInt(req.params.id);
  const userId = req.user.id;

  // 로그인한 유저 DB정보 가져오기
  const userInfo = await User.findOne({
    id : userId,
  })
  console.log(userInfo);
  // 클릭한 컨텐츠 DB 정보 가져오기

  const result = await db.collection("post").findOne({_id : id})
  // 해당 컨텐츠의 컨텐츠스코어 DB정보 가져오기

  const result2 = await db.collection("contentScore").find({
    userId : userId
  }).toArray();
  console.log("result2 : " + result2);

  const result3 = await db.collection("contentScore").find({
    title : result.제목
  }).toArray();
  
  console.log("평점찍은 컨텐츠 정보 : " + JSON.stringify(result3))

  // 해당 컨텐츠에 유저가 평가한 점수 가져오기
  function userScore(){
    for(const us of result2){
      console.log(us);
      if(us.title==result.제목){
        console.log(req.user.id);
        console.log("test1 : " +us.score);
        return us.score
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
  

  // 유저의 컨텐츠점수 카운트
  const contentCnt = await db.collection("contentScore")
                  .countDocuments({title: result.제목, score: {"$exists": true}})
  
  // 별점 평균 내기
  const scoreAvg = function() {
    let sumScore = 0;
    let notNum = 0;
    let avg = 0;
    console.log("콘텐츠갯수 : " + contentCnt);
    for(let i=0; i<contentCnt; i++){
      console.log("콘텐츠 점수 : " + result3[i].score);
      sumScore += result3[i].score;
    }
    console.log("컨텐츠점수합 : " + sumScore)
    avg = Math.ceil(sumScore/contentCnt);
    console.log("컨텐츠 평균 : " + avg)
    return isNaN(avg) ? notNum : avg
  }

  // 리뷰 개수 조회
  const cnt = result.review ? result.review.length : 0;
  
  // 리뷰 생성
  const review = result.review ? result.review : "";

  res.render("watch", { 
    posts : result,
    title : userInfo.bookmark,
    score : userScore(),
    avg : scoreAvg(),
    cnt : cnt,
    review : review
  })
}

module.exports = watch; 