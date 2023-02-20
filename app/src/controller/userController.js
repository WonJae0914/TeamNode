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

module.exports = { renderSignup, signup, renderLogin, login , privacypolicy};