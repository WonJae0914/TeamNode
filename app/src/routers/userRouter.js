const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session'); 

const {
    renderSignup,
    signup,
    renderLogin,
    login
} = require('../controller/userController');
const userRouter = express.Router();

userRouter.use(session({   // session 부여하는건 reuter에서 사용하는거니까 app.use 가 아닌 router.use 로 부여함
  secret: 'admin', // 비밀코드 -> 세션을 만들 때 쓰는 비밀번호
  resave: true, // true  :  변경사항이 없어도 session을 다시 저장
  saveUninitialized: false
})); // false :  empty session obj가 쌓이는 걸 방지
userRouter.use(passport.initialize());
userRouter.use(passport.session());

passport.use(
  new LocalStrategy({ usernameField: 'id' }, async (id, pw, done) => {
    try {
      const user = await User.findOne({ id });
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }
      const isMatch = await bcrypt.compare(pw, user.pw);
      if (!isMatch) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

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



userRouter.get('/signup',renderSignup);
userRouter.post('/signup',signup);
userRouter.get('/login',renderLogin);
userRouter.post('/login',login);

module.exports = userRouter;
