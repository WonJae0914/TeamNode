const express = require("express");

const board = require("./src/routers/boardRouter");
const browse = require("./src/routers/globalRouter");
const admin = require("./src/routers/adminRouter");
const morgan = require("morgan");
const app = express();
const logger = morgan("dev");
const methodOverride = require('method-override');

app.use(methodOverride('method-override')); // method-override
app.use(methodOverride('_method')); // method-override

app.set("view engine", "ejs");  
app.set("views", "./src/views");


app.use(express.static(`${__dirname}/src/public`));
app.use(logger);

app.use(express.urlencoded({ extended: true }));



//라우팅 미들웨어 (제일 하단 고정)
app.use("/", browse);
app.use("/board", board);
app.use("/admin", admin)
module.exports = app;
