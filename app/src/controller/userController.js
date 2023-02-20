const User = require("../models/User");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const renderSignup = (req, res) => {
  res.render('signup');
};

const signup = async (req, res, next) => {
  const { id, pw, email, pwChk, age, gender, country, isAgreed, isOptedIn } = req.body;
  try {
    if (pw !== pwChk) {
      return res.send("<script>alert('비밀번호가 틀렸습니다.'); window.location.replace('/login');</script>");
    } else {
      const hashedPassword = await bcrypt.hash(pw, 10);
      await User.create({
        id,
        pw: hashedPassword,
        email,
        age,
        gender,
        country,
        isAgreed,
        isOptedIn
      }, () => {
        res.send("<script>alert('환영합니다'); window.location.replace('/login');</script>");
      });
    }
  } catch (err) {
    console.log(err);
    res.send('Error');
  }
};

const getMypage = (req, res) => {
  if (!req.user) {
    return res.redirect('/login');
  }
  res.render('mypage', { user: req.user });
}


const PrivacyPolicy = (req, res) => {
  res.render('privacypolicy');
};

const renderLogin = (req, res) => {
  res.render('login');
};

const login = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
});

passport.use(new LocalStrategy({ usernameField: 'id' ,passwordField: 'pw',session: true, }, async (id, pw, done) => {
  try {
    const user = await User.findOne({ id });
    if (!user) {
      return done(null, false, { message: '아이디가 없습니다.' });
    }
    const isMatch = await bcrypt.compare(pw, user.pw);
    if (!isMatch) {
      return done(null, false, { message: '잘못된 비밀번호 입니다.' });
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));
    
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = { renderSignup, signup, renderLogin, login, PrivacyPolicy, getMypage };
