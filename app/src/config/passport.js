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


passport.use(
  new LocalStrategy({usernameField: 'id', passwordField : 'pw' }, async (id, pw, done) => {
    try {
      const user = await User.findOne({ id });
      if (!user || user.delete === true) {
        return done(null, false, { message: '등록된 아이디가 없습니다.' });
      }
      const isMatch = await bcrypt.compare(pw, user.pw); 
      if (!isMatch) {
        return done(null, false, { message: '비밀번호를 잘못입력하였습니다.' });
      }
      if (user.admin === true) { // 관리자 권한 체크
        user.role = 'admin'; // 사용자 객체에 역할(role) 필드 추가
      } else {
        user.role = 'user';
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);




module.exports = passport;