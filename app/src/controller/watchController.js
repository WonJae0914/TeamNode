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
      // const userinfo = req.user;

      // await User.find({
      //   _id : userinfo.id,
      // }, function(err, result){
      //   if(err) return err
      //   console.log(result)
      //   return result;
      // }).exec();
      // console.log("유저데이터:" + user);

      const collection = db.collection('post');
      await collection.findOne({
        _id : id,
      }, function(err, result){
        if(err) return err;
        return res.render("watch", { posts : result });
      });
   }

module.exports = watch; 