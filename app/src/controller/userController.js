const User = require("../models/User");
const bcrypt = require('bcrypt');
const passport = require('passport');
// const session = require('express-session');

const renderSignup = (req, res) => {
  res.render('signup');
};

const signup = async (req, res) => {
  const { id, email, pw, age, gender, country, agreedToPrivacyPolicy, subscribedToPromotions} = req.body;
  try {
    const hash = await bcrypt.hash(pw, 10);
    await User.create({
      id,
      email,
      pw : hash,
      age,
      gender,
      country, 
      agreedToPrivacyPolicy, 
      subscribedToPromotions
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Error creating user');
  }
  res.redirect('/signup');
};

const privacypolicy = async (req, res) => {
    res.render('privacypolicy');
};


const renderLogin = (req, res) => {
  res.render('login');
};

const login = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
});


function loginChk(req, res, next) {
  const id = req.body;
  if(req.user.id === id) {
    next();
  }else{
    res.send(`로그인안하셨는데요? <a href= \"/login\">로그인</a>`);
  }
}


const userdetail = async (req, res) => {
  const users = await User.find({});
  return res.render('user_detail', {
    user});
  // await User.update
 
}

module.exports = { renderSignup, privacypolicy, signup , renderLogin, login , userdetail};

