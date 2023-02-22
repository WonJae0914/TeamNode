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
    res.send(`<script>alert("${id}님 환영합니다."); window.location.href="/login";</script>`);
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
    req.login(user, err => {
      if (err) {
        return next(err);
      }
      return res.redirect('/userpage');
    });
  })(req, res, next);
};

const userdetail =  (req, res) => {
  if (!req.user) {
    return res.redirect('/login');
  }
  res.render('user_detail', { user: req.user });
}


const updateuser = async(req, res) => {
  const userinfo = req.user;
  try {
    await User.findOneAndUpdate(
      {id: userinfo.id},
      {$set : req.body },
      {returnOriginal : false}
    );
    res.send(`<script>alert("${userinfo.id}님 수정되었습니다."); window.location.href="/login";</script>`);
  } catch (err) {
    console.log(err);
    res.status(500).send('Error creating user');
  }
};
const removeuser = async (req, res) => {
  const userInfo = req.user;

  try {
    await User.findOneAndDelete(
      { id: userInfo.id },
      { $set: req.body },
      { returnOriginal: false }
    );
    res.status(200).send(`<script>alert("이용해주셔서 감사합니다."); window.location.href="/login";</script>`);
  } catch (err) {
    console.log(err);
    res.status(500).send(`<script>alert("삭제시 에러 발생");</script>`);
  }
};

const logout = (req, res) => {
  req.session.destroy();
  return res.send('재로그인 하겠습니까? <a href=\"/login\">로그인</a>')
};
module.exports = { renderSignup, privacypolicy, signup , renderLogin, login , logout, userdetail, updateuser, removeuser};