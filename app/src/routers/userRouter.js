const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const bcrypt = require('bcrypt');

const {
  renderSignup,
  signup,
  PrivacyPolicy,
  renderLogin,
  login,
  getMypage
  
} = require('../controller/userController');
const userRouter = express.Router();

userRouter.use(session({
  secret: '비밀코드',
  resave: true,
  saveUninitialized: false
}));

userRouter.use(passport.initialize());
userRouter.use(passport.session());


userRouter.get('/signup',renderSignup);
userRouter.get('/privacypolicy',PrivacyPolicy);
userRouter.post('/signup',signup);
userRouter.get('/login',renderLogin);
userRouter.post('/login',login);
userRouter.get('/mypage', getMypage);

module.exports = userRouter;
