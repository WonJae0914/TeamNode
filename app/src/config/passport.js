// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const User = require("../models/User");
// const bcrypt = require('bcrypt');

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

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await User.findOne({ id: id });
//     done(null, user);
//   } catch (err) {
//     done(err);
//   }
// });

// module.exports = passport;