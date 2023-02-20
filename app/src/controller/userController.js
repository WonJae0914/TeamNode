const User = require("../models/User");
const bcrypt = require('bcrypt');
const passport = require('passport');
// const session = require('express-session');

const renderSignup = (req, res) => {
  res.render('signup');
};

const PrivacyPolicy = async (req, res) => {
  res.render('privacypolicy');
};

const signup = async (req, res) => {
    const { id, email, pw, age, gender, country, isAgreed, isOptedIn } = req.body;
  try {
    const hash = await bcrypt.hash(pw, 10);
    if (pw !== pwChk) {
      return res.send("<script>alert('비밀번호가 틀렸습니다.'); window.location.replace('/signup');</script>");
    } else {
    await User.create({
      id,
      email,
      pw : hash,
      age,
      gender,
      country, 
      isAgreed, 
      isOptedIn
    },() => {
      res.send("<script>alert('${id}환영합니다'); window.location.replace('/login');</script>");
    });
  }
  } catch (err) {
    console.log(err);
    res.status(500).send('Error creating user');
  }
}



const renderLogin = (req, res) => {
  res.render('login');
};

const login = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
});



const getMypage = (req, res) => {
  if (!req.user) {
    return res.redirect('/login');
  }
  res.render('mypage', { user: req.user });
}

module.exports = { renderSignup, PrivacyPolicy,signup, renderLogin, login, getMypage };

