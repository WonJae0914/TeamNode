const mongoose = require("mongoose"); // 몽구스 import

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  pw: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    min: 1,
  },
  gender: {
    type: String,
    enum: ['men', 'women'],
    required: true,
  },
  country: {
    type: String,
    enum: ['Korea', 'america', 'french', 'UK'],
    required: true,
  },
  isAgreed: {
    type: Boolean,
    required: true
  },
  isOptedIn: {
    type: Boolean,
    required: true
  }
});

const User = mongoose.model("User", userSchema); // .model --> document middleware
// 첫번째 파라미터 "User" = collection명, 두번째 파라미터 contentSchema = 스키마
// 몽구스에서는 첫번째 글자가 대문자인 collection명칭을 사용하지만
// mongoDB에서 조회할 때는 전체 소문자에 복수형으로 조회해야함
module.exports = User; // hello2 Database에 "User" collection에 연결된 User 변수 export
