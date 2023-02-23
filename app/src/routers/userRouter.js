const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {
    renderSignup,
    signup,
    renderLogin,
    login
} = require('../controller/userController');


passport.use(
  new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
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

const userRouter = express.Router();

userRouter.get('/signup',renderSignup);
userRouter.post('/signup',signup);
userRouter.get('/login',renderLogin);
userRouter.post('/login',login);
userRouter.get("/user", userRouter);

module.exports = userRouter;
