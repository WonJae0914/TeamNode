const mongoose = require("mongoose"); // 몽구스 import
const bcrypt = require('bcrypt'); // 암호화 하려고 사용

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(v) {
        return /^.{4,12}$/.test(v);
      },
      message: props => `${props.value} 아이디는 4자이상 12자 미만으로 기재부탁드립니다. `,
    },
  },
  pw: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/.test(v);
      },
      message: (props) => 
      `${props.value} 안전하지 않는 비밀번호입니다. 공백을 제외하고 특수문자를 포함한 8자 이상 기재부탁드립니다.`
    },
  },
  email: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    validate: {
      validator: function (v) {
        return v >= 18 && v <=100;
      },
      message: '가입 가능한 나이는 18세 이상 100세 이하입니다.'
    }
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
  isAgreed: { // 개인정보처리방침 필수선택사항
    type: Boolean,
    required: true,
  },
  isOptedIn: { // 이메일로 추가 수신여부*(선택사항)
    type: Boolean,
    required: false,
  },
}, { timestamps: true });

userSchema.pre('save', async function (next) { // pre는 스키마 미들웨어 함수 중 하나. 
  //save 메소드를 실행하기 전에 비밀번호 해싱작업을 실행 
  // this.isModified('pw')는 현재 스키마 객체의 비밀번호가 변경되었는지를 확인하고
  // this.isNew 는 새로운 객체가 생성되었는지 확인
  // 즉 비밀번호 객체가 변경되었거나 새로 생성되면 해싱해주는 작업 함수임
  try {
    if (this.isModified('pw') || this.isNew) {
      const hashedPassword = await bcrypt.hash(this.pw, 10);
      this.pw = hashedPassword;
    } 
    return next();
  } catch (err) {  
    return next(err);
  }       
});

userSchema.methods.comparePassword = async function (pw) {
  return await bcrypt.compare(pw, this.pw);
};

const User = mongoose.model("User", userSchema); // .model --> document middleware
// 첫번째 파라미터 "User" = collection명, 두번째 파라미터 contentSchema = 스키마
// 몽구스에서는 첫번째 글자가 대문자인 collection명칭을 사용하지만
// mongoDB에서 조회할 때는 전체 소문자에 복수형으로 조회해야함
module.exports = User; // hello2 Database에 "User" collection에 연결된 User 변수 export
