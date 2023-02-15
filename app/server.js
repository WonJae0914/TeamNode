// import express from "express";
// import morgan from "morgan";
// import globalRouter from "./routers/globalRouter";
// import videoRouter from "./routers/videoRouter";
// import userRouter from "./routers/userRouter";
// import ejsLayouts from "express-ejs-layouts";
const express = require("express");
const board = require("./src/routers/boardRouter");
const home = require("./src/routers/globalRouter");
const ejsLayouts = require("express-ejs-layouts");
const morgan = require("morgan");

const app = express();
const logger = morgan("dev");

app.set("view engine", "ejs");
app.set("views", "./src/views");
app.set("layout extractScripts", true);
app.set("layout", "layout");

app.use(express.static(`${__dirname}/src/public`));
app.use(logger);
app.use(ejsLayouts);
app.use(express.urlencoded({ extended: true }));

app.use("/", home);
app.use("/board", board);

module.exports = app;
