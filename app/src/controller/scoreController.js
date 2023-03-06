"use strict"

// 모델에서 유저 모델 불러오기 
const User = require("../models/User");
// 패스포트 불러오기 (로그인한 유저 세션 정보 받기 위함)
const passport = require("../config/passport");
// DB 연결을 위한 몽고 클라이언트 불러오기 
const { collection } = require('../models/User');
const { compareSync } = require("bcrypt");

const MongoClient = require('mongodb-legacy').MongoClient;

let db;
MongoClient.connect("mongodb+srv://kdKim:6r7r6e5!KD@cluster0.mo9rckf.mongodb.net/?retryWrites=true&w=majority"
    , { useNewUrlParser: true },
    function (err, client) {
        if (err) { return console.log('DB연결 실패'); }
        db = client.db('test');
        console.log("몽고디비 연결 성공");
    });

// 평점 추가
const addScore = async function(req,res){
    console.log("??")
    console.log(req.body);
    console.log("파람스:" + req.params.id);
    const { userScore } = req.body
    const { userTitle } = req.body
    try {
        await db.collection("contentScore").insertOne(
            { userId : req.user.id,
              title : userTitle,
              score : parseInt(userScore) })
            //   contentId : req.param.id
        res.status(200).json({message : "북마크 추가!"})
    } catch (error) {
        res.status(400).json({message : "북마크 실패!"})
    }
}
// 평균계산
const avgScore = async function(req,res){
    const data = await db.collection("contentScore").findOne({
        
    })
}

module.exports = addScore;