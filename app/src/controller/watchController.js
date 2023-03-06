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
  const userInfo = await User.findOne({
    id : user.id,
  })
  console.log(userInfo);

  const result2 = await db.collection("contentScore").findOne({
    userId : user.id,
  });
  console.log("리절트2" + result2);

  await db.collection('post').findOne({
    _id : id,
  }, function(err, result){
    if(err) return err;
    return res.render("watch", { 
      posts : result,
      title : userInfo.bookmark,
      score : result2
    });
  });

  
}

module.exports = watch; 