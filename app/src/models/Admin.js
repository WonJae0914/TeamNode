"use strict"

const mongoose = require("mongoose"); // 몽구스 import

const adminSchema = new mongoose.Schema({
  // Schema 객체 생성
  title: { type: String, required: true, maxLength: 80 },
  category: [{ type: String, required: true, trim: true }], // category
  actor: [{ type: String, required: true, trim: true }],
  language: { type: String, required: true, trim: true },
  rating: { type: Number, default: 0, required: true },
  length: { type: Number, required: true },
  uploadDate: { type: Date },
  makingDate: { type: Date, required: true },
  modifyDate: { type: Date },
  meta: {
    views: { type: Number, default: 0, required: true },
    score: { type: Number, default: 0, required: true },
  },
});

const Admin = mongoose.model("Admin", adminSchema); // .model --> document middleware
// 첫번째 파라미터 "Admin" = collection명, 두번째 파라미터 adminSchema = 스키마
// 몽구스에서는 첫번째 글자가 대문자인 collection명칭을 사용하지만
// mongoDB에서 조회할 때는 전체 소문자에 복수형으로 조회해야함
module.exports = Admin; // hello2 Database에 "Admin" collection에 연결된 Admin 변수 export
