// import express from "express";
// import morgan from "morgan";
// import globalRouter from "./routers/globalRouter";
// import videoRouter from "./routers/videoRouter";
// import userRouter from "./routers/userRouter";
// import ejsLayouts from "express-ejs-layouts";
const express = require("express");
const board = require("./src/routers/boardRouter");

const app = express();

app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(express.static(`${__dirname}/src/public`));

app.use("/board", boardRouter);

module.exports = app;
