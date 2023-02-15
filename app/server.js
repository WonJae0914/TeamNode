// import express from "express";
// import morgan from "morgan";
// import globalRouter from "./routers/globalRouter";
// import videoRouter from "./routers/videoRouter";
// import userRouter from "./routers/userRouter";
// import ejsLayouts from "express-ejs-layouts";
const express = require("express");
const router = require("./src/routers/router")
const app = express();

app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(express.static(`${__dirname}/src/public`));



//라우팅(미들웨어 제일 하단 고정)
app.use("/", router);

module.exports = app;
