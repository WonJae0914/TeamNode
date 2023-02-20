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


const login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.render('user_login', { message: info.message });
    }
    req.logIn(user, err => {
      if (err) {
        return next(err);
      }
      return res.redirect('/userdetail');
    });
  })(req, res, next);
};


const userdetail =  (req, res) => {
  if (!req.User) {
    return res.redirect('/login');
  }
  res.render('user_detail', { User: req.User });
}

module.exports = { renderSignup, privacypolicy, signup , renderLogin, login , userdetail};