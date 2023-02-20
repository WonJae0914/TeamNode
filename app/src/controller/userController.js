const User = require("../models/User");
const bcrypt = require('bcrypt');
const passport = require('passport');

const renderSignup = (req, res) => {
  res.render('signup');
};

const signup = async (req, res) => {
  const { id, email, pw} = req.body;
  try {
    await User.create({
      id,
      email,
      pw,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Error creating user');
  }
  res.redirect('/signup');
};

const renderLogin = (req, res) => {
  res.render('login');
};

const login = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
});

module.exports = { renderSignup, signup, renderLogin, login };