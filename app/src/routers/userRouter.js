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
} = require('../controller/userController');

userRouter.get('/signup',renderSignup);
userRouter.get('/privacypolicy', privacypolicy); // 개인정보처리방침
userRouter.post('/signup',signup);
userRouter.get('/login',renderLogin);
userRouter.post('/login',login);
// userRouter.get("/user", userRouter);
userRouter.get('/userpage', isLoggedIn ,userdetail); // user상세정보
userRouter.post('/userpage', isLoggedIn,updateuser); // user정보변경
userRouter.get('/userpage/delete', removeuser); // user삭제
userRouter.get('/logout',isLoggedIn ,logout);

module.exports = userRouter;
