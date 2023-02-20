"use strict"

const mongoose = require("mongoose"); // 몽구스 import

const questionSchema = new mongoose.Schema({
  // questionSchema에 mongoose 스키마 선언
  // Schema 객체 생성
  title: { type: String, required: true, maxLength: 80 },
  detail: [{ type: String, required: true, minlength: 2 }],
  createdDate: {
    type: Date,
    required: true,
    default: () => Date.now(), // 따로 값을 지정하지 않을 시 디폴트 값으로 출력
  },
  modified: { type: Boolean, default: false },
  views: { type: Number, default: 0, required: true },
  loggedIn: { type: Boolean, default: true },
});

const Question = mongoose.model("Question", questionSchema);
// 첫번째 파라미터 "Question" = collection명, 두번째 파라미터 questionSchema = 스키마
// 몽구스에서는 첫번째 글자가 대문자인 collection명칭을 사용하지만
// mongoDB에서 조회할 때는 전체 소문자에 복수형으로 조회해야함
module.exports = Question; // hello2 Database에 "Question" collection에 연결된 Question 변수 export
