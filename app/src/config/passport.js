const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require("../models/User");
const bcrypt = require('bcrypt');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findOne({id});
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// passport.use(new LocalStrategy({ usernameField: 'id',  passwordField: 'pw' },
//   async (id, pw, done) => {
//     try {
//       const user = await User.findOne({ id });
//       const password = user ? user.pw : null;
//       if (!user || user.delete === true) {
//         return done(null, false, { message: '등록된 아이디가 없습니다.' });
//       }
//       const match = await bcrypt.compare(pw, user.pw);
//       if (!match) {
//         return done(null, false, { message: '비번틀림', 'pw': user.pw });
//       }
//       return done(null, user);
//     } catch (err) {
//       console.error(err);
//       return done(err);
//     }
//   }
// ));

passport.use(
  new LocalStrategy({usernameField: 'id', passwordField : 'pw' }, async (id, pw, done) => {
    try {
      const user = await User.findOne({ id });
      if (!user || user.delete === true) {
        return done(null, false, { message: '등록된 아이디가 없습니다.' });
      }
      const isMatch = await bcrypt.compare(pw, user.pw); 
      console.log(pw, user.pw); 
      if (!isMatch) {
        return done(null, false, { message: '비밀번호를 잘못입력하였습니다.' });
        // return console.log(user.pw);
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);




module.exports = passport;