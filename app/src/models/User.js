"use strict"

const mongoose = require("mongoose"); // 몽구스 import
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  // Schema 객체 생성
  id: {
    type: String,
    required: true,
    minlength: 8,
    trim : true,
    match : /^[A-Za-z0-9]{7,15}$/g,
    unique : true
  },
  email: {
    type: String,
    required: true,
    match : /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
  },
  pw: {
    type: String,
    minlength: 8,
    required: true,
    // match: /(?=.*[a-zA-Z])(?=.*\d)(?=.*[&!@#$%^*+=_()-])/,
    // validate: {
    //   validator: function(pw) {
    //     return pw === this.pwChk;
    //   },
    //   message: 'Password confirmation does not match'
    // },
    // set: function(pw) {
    //   return bcrypt.hashSync(pw, 10);
    // }
  },
  age: { type: Number, 
    required: true, 
    min: 18 
  },
  gender: { type: String, 
    enum: ['men', 'women'], 
    required: true,
    default: 'men' 
  },
  country: { type: String, 
    enum: ['Korea', 'america', 'french', 'UK'], 
    required: true ,
    default: 'Korea'},
  agreedToPrivacyPolicy: { 
    type: Boolean, 
    required: true ,
    default: true},
  subscribedToPromotions: { 
    type: Boolean, 
    required: true,
    default:false 
  }  
});

const User = mongoose.model("User", userSchema); // .model --> document middleware
// 첫번째 파라미터 "User" = collection명, 두번째 파라미터 contentSchema = 스키마
// 몽구스에서는 첫번째 글자가 대문자인 collection명칭을 사용하지만
// mongoDB에서 조회할 때는 전체 소문자에 복수형으로 조회해야함
module.exports = User; // hello2 Database에 "User" collection에 연결된 User 변수 export
