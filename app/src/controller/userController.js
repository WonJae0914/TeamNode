"use strict";

//userController.js
// 모델과 모듈 불러오기
const User = require("../models/User");
const bcrypt = require("bcrypt");
const passport = require("../config/passport"); // passport 모듈 불러오기


// 회원 가입 페이지 렌더링
const renderSignup = (req, res) => {
  if (req.user) {
    return res.redirect("/home");
  }
  res.render("user_signup");
};

// 회원 가입 처리
const signup = async (req, res) => {
  const {
    id,
    email,
    pw,
    year,
    month,
    day,
    gender,
    country,
    isAgreed,
    isOptedIn,
  } = req.body;
  const birthday = { year, month, day };

  // 유효성 검사
  try {
    const hash = await bcrypt.hash(pw, 10);
    if (isAgreed === "on") {
      await User.create({
        id,
        email,
        pw: hash,
        birthday,
        gender,
        country,
        isAgreed,
        isOptedIn,
      });
      res.send(
        `<script>alert("${id}님 환영합니다."); window.location.href="/login";</script>`
      );
    } else {
      res.send(
        `<script>alert("개인정보활용동의 필수"); window.location.href="/signup";</script>`
      );
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Error creating user: " + err.message);
  }
};

// 개인정보 처리 방침 페이지 렌더링
const privacypolicy = async (req, res) => {
  res.render("user_privacypolicy");
};
//userController.js
// 로그인 페이지 렌더링
const renderLogin = (req, res) => {
  if (req.user) {
    return res.redirect("/browse");
  }
  res.render("user_login");
};


const checkDuplicateId = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ id });
  res.json(Boolean(user));
}

const checkDuplicateEmail = async (req, res) => {
  const { email } = req.params;
  const user = await User.findOne({ email });
  res.json(Boolean(user));
}

// 로그인 확인 함수
function isLoggedIn(req, res, next) {
  // 로그인했는지 안했는지 확인하는 함수
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

function adminisLoggedIn(req, res, next) {
  if (req.isAuthenticated() && req.user.admin===true) {
    return next();
  } else {
    res.redirect('/home');
  }
}

function localLoggedIn(req, res, next) {
  res.locals.isLoggedIn = req.isAuthenticated();
  next();
}

// 로그인 처리
const login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    // 로컬에 정보 가져오기
    if (err) {
      return next(err);
    }
    if (!user || user.delete == "true") {
      return res.render("user_login", { message: info.message });
    }
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      else if(user.admin === true) {
        return res.redirect("/admin/home");
      }else{
      return res.redirect("/browse");
    }
    });
  })(req, res, next);
};
// 유저 상세 정보 페이지 렌더링
const userdetail = (req, res) => {
  if (!req.user) {
    return res.redirect("/login");
  }
  res.render("user_detail", { user: req.user });
};
// 유저 정보 업데이트 처리
const updateuser = async (req, res) => {
  const userinfo = req.user;
  const { year, month, day, gender, country, isOptedIn } = req.body;
  const upyear = parseInt(req.body.year, 10);
  const upmonth = parseInt(req.body.month, 10);
  const upday = parseInt(req.body.day, 10);
  const birthday = { year: upyear, month: upmonth, day: upday };
  try {
    await User.updateOne(
      { id: userinfo.id },
      {
        $set: {
          birthday,
          gender,
          country,
          isOptedIn,
        },
      },
      { returnOriginal: false }
    );
    res.send(
      `<script>alert("${userinfo.id}님 수정되었습니다."); window.location.href="/userpage";</script>`
    );
  } catch (err) {
    console.log(err);
    res.status(500).send("Error update user");
  }
};
// 유저 탈퇴 처리
const removeuser = async (req, res) => {
  const userInfo = req.user;
  const confirmed = req.query.confirmed;
  if (confirmed === "true") {
    try {
      await User.updateOne(
        { id: userInfo.id },
        { $set: { delete: true } },
        { returnOriginal: false }
      );
      res
        .status(200)
        .send(
          `<script>alert("이용해주셔서 감사합니다."); window.location.href="/login";</script>`
        );
      req.session.destroy();
    } catch (err) {
      console.log(err);
      res.status(500).send(`<script>alert("삭제시 에러 발생");</script>`);
    }
  } else {
    res.redirect("/userpage");
  }
};
// 유저 로그아웃 처리
const logout = (req, res) => {
  try {
    req.session.destroy(); // 세션만료
    return res.redirect("/login");
  } catch (err) {
    console.error(err);
    return res.status(500).send(`<script>alert("로그아웃 에러 발생");</script>`);
  }
};

const home = (req, res)=>{
  res.render('home');
}

module.exports = { 
  renderSignup, privacypolicy, signup , 
  renderLogin, isLoggedIn, login , logout, 
  userdetail, updateuser, removeuser,localLoggedIn, adminisLoggedIn,checkDuplicateId, checkDuplicateEmail,home};

