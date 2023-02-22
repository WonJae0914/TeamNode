const User = require("../models/User");
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const passport = require("../config/passport");

const renderSignup = (req, res) => {
  res.render('user_signup');
};

const signup = async (req, res) => {
  const { id, email, pw, age, gender, country, isAgreed, isOptedIn } = req.body;
  
  try {
    const hash = await bcrypt.hash(pw, 10);
    if(isAgreed==='on'){
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
  }else {
    res.send(`<script>alert("개인정보활용동의 필수"); window.location.href="/signup";</script>`);
  }
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
    console.log(info);
    if (err) {
      return next(err);
    }
    if ((!user) || user.delete == "true") {
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
  console.log(req.body, userinfo);
  try {
    await User.updateOne(
      {id: userinfo.id},
      {$set : req.body },
      {returnOriginal : false}
    );
    res.send(`<script>alert("${userinfo.id}님 수정되었습니다."); window.location.href="/userpage";</script>`);
  } catch (err) {
    console.log(err);
    res.status(500).send('Error creating user');
  }
};
const removeuser = async (req, res) => {
  console.log(req.user)
  const userInfo = req.user;
  try {
    await User.updateOne(
      {id : userInfo.id},
      {$set :{delete : true} },
      {returnOriginal : false}
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