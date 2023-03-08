// userRouter.js
const express = require('express');
const userRouter = express.Router();

const {
  renderSignup,
  signup,
  renderLogin,
  isLoggedIn,
  login,
  privacypolicy,
  logout, 
  userdetail,
  updateuser,
  removeuser,
  checkDuplicateId,
  checkDuplicateEmail,
  home
} = require('../controller/userController');


userRouter.get("/home",home);
userRouter.get('/signup',renderSignup);
userRouter.get('/checkDuplicateId/:id',checkDuplicateId); // 중복체크
userRouter.get('/checkDuplicateId/:email',checkDuplicateEmail);
userRouter.get('/privacypolicy', privacypolicy); // 개인정보처리방침
userRouter.post('/signup',signup); // user 회원가입
userRouter.get('/login',renderLogin);
userRouter.post('/login',login); // user로그인
userRouter.get('/userpage', isLoggedIn ,userdetail); // user상세정보
userRouter.post('/userpage', isLoggedIn,updateuser); // user정보변경
userRouter.get('/userpage/delete', removeuser); // user 탈퇴
userRouter.get('/logout',isLoggedIn ,logout); // user로그아웃




module.exports = userRouter;
