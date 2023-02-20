//express 모듈 불러오기
const express = require("express");
const board = require("./src/routers/boardRouter");
const browse = require("./src/routers/globalRouter");

const morgan = require("morgan");
const logger = morgan("dev");

// 뷰 엔진 및 셋팅
app.set("view engine", "ejs");
app.set("views", "./src/views");

// 오버라이딩
app.use(methodOverride('method-override')); // method-override
app.use(methodOverride('_method')); // method-override

// js,css,img 등 public 연결 셋팅
app.use(express.static(`${__dirname}/src/public`));

// 모르건 셋팅
app.use(logger);

// url 인코딩 
app.use(express.urlencoded({ extended: true }));


//라우팅 미들웨어 (제일 하단 고정)
app.use("/", browse);
app.use("/board", board);
app.use("/admin", admin)

module.exports = app;

