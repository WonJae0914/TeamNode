const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session'); 
const User = require("../models/User");
const bcrypt = require('bcrypt');

const userRouter = express.Router();


userRouter.use(session({   // session 부여하는건 reuter에서 사용하는거니까 app.use 가 아닌 router.use 로 부여함
  secret: '비밀코드', // 비밀코드 -> 세션을 만들 때 쓰는 비밀번호
  resave: true, // true  :  변경사항이 없어도 session을 다시 저장
  saveUninitialized: false
})); // false :  empty session obj가 쌓이는 걸 방지

userRouter.use(passport.initialize());
userRouter.use(passport.session());

passport.use(
  new LocalStrategy({usernameField: 'id', passwordField : 'pw' }, async (id, pw, done) => {
    try {
      const user = await User.findOne({ id });
      if (!user || user.delete === true) {
        return done(null, false, { message: '등록된 아이디가 없습니다.' });
      }
      const isMatch = await bcrypt.compare(pw, user.pw); 
      console.log(pw, user.pw); 
      if (!isMatch) {
        return done(null, false, { message: '비밀번호를 잘못입력하였습니다.' });
        // return console.log(user.pw);
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null,  user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findOne({id});
    done(null, user);
  } catch (err) {
    done(err);
  }
});


const {
  renderSignup,
  signup,
  renderLogin,
  login,
  privacypolicy,
  logout,
  userdetail,
  updateuser,
  removeuser
} = require('../controller/userController');

userRouter.get('/signup',renderSignup);
userRouter.get('/privacypolicy', privacypolicy); // 개인정보처리방침
userRouter.post('/signup',signup);
userRouter.get('/login',renderLogin);
userRouter.post('/login',login);
userRouter.get('/userpage', userdetail); // user상세정보
userRouter.post('/userpage', updateuser); // user정보변경
userRouter.get('/userpage/delete', removeuser); // user삭제
userRouter.get('/',logout)

module.exports = userRouter;
