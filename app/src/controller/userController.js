const User = require("../models/User");
const bcrypt = require('bcrypt');
const passport = require('passport');
// const session = require('express-session');

const renderSignup = (req, res) => {
  res.render('user_signup');
};

const signup = async (req, res) => {
  const { id, email, pw, age, gender, country, isAgreed, isOptedIn } = req.body;
  try {
    const hash = await bcrypt.hash(pw, 10);
    await User.create({
      id,
      email,
      pw : hash,
      age,
      gender,
      country, 
      isAgreed, 
      isOptedIn 
    });
    res.send(`<script>alert("${id}님 환영합니다."); window.location.href="/signup";</script>`);
  } catch (err) {
    console.log(err);
    res.status(500).send('Error creating user');
  }
};

const privacypolicy = async (req, res) => {
    res.render('user_privacypolicy');
};


const renderLogin = (req, res) => {
  res.render('user_login');
};

const login = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
});

function loginChk(req, res, next) {
  if(req.user){
    next();
  }else{
    res.send(`로그인안하셨는데요? <a href= \"/login\">로그인</a>`);
  }
}


const userdetail =  (req, res) => {
  if (!req.user) {
    return res.redirect('/login');
  }
  res.render('user_detail', { user: req.user });
}

module.exports = { renderSignup, privacypolicy, signup , renderLogin, login , userdetail};