//express 모듈 불러오기
const express = require("express");
const session = require('express-session'); // session module
const passport = require("./src/config/passport"); // passport module
const boardRouter = require("./src/routers/boardRouter");
const browse = require("./src/routers/browseRouter");
const admin = require("./src/routers/adminRouter");
const user = require("./src/routers/userRouter");
const app = express();
const methodOverride = require("method-override");
const errorHandler = require("./src/utils/errorHandler");
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');


const morgan = require("morgan");
const { isLoggedIn, localLoggedIn,adminisLoggedIn } = require("./src/controller/userController");
const logger = morgan("dev");

// 뷰 엔진 및 셋팅 
app.set("view engine", "ejs");
app.set("views", "./src/views");

// 오버라이딩
app.use(methodOverride("method-override")); // method-override
app.use(methodOverride("_method")); // method-override

// js,css,img 등 public 연결 셋팅
app.use(express.static(`${__dirname}/src/public`));

// 모르건 셋팅
app.use(logger);

// url 인코딩
app.use(express.urlencoded({ extended: true }));

// session, passport 미들웨어
app.use(session({
    secret: '비밀코드', // 비밀코드 -> 세션을 만들 때 쓰는 비밀번호
    resave: true, // true  :  resave는 세션이 수정되지 않은 경우에도 세션을 저장할 지 여부를 결정
    saveUninitialized: false, // saveUninitialized는 초기화되지 않은 세션을 저장할 지 여부를 결정
    cookie:{
      maxAge:3600000,
    } // false :  empty session obj가 쌓이는 걸 방지
    // store: new Session({mongooseConnection: mongoose.connection }) // 이걸 쓰려면 근데 npm i conect-mongo 해줘야함
    // store에 mongoose.connection을 쓴 것은, 기존에 연결된 DB를 그대로 사용하겠다는 말입니다.
}));
  app.use(passport.initialize());
  app.use(passport.session()); 
  // passport는 session을 사용하기 때문에 exporess-session 미들웨어 코드 다음에 작성해야한다.
  //app.use(session()) 코드 아래에 위치해야 한다는 말이다. 또, Cookie 나 Cookie-parser 미들웨어 다음에 작성해야 한다. 

// 보안
app.use(helmet());

// 요청 데이터 제한
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);
  

//라우팅 미들웨어 (제일 하단 고정)
app.use(errorHandler);
app.use(localLoggedIn);
app.use("/", browse);
app.use("/board", isLoggedIn,boardRouter);
app.use("/admin", adminisLoggedIn,admin);
app.use("/", user);

module.exports = app;
