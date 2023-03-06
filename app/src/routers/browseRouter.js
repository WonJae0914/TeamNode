"use strict"

//express 모듈 불러오기 
const express = require("express");
const browseRouter = express.Router();

//컨트롤러 불러오기 
const browse = require("../controller/browseController");
const watch = require("../controller/watchController");
const video = require("../controller/videoController");
const {addbookmark,delBookmark} = require("../controller/bookmarkController");
const starScore = require("../controller/scoreController")
// const bookmark = require("../controller/bookmarkController");

//get
browseRouter.get("/browse" , browse); // 메인 페이지
browseRouter.get("/watch/:id", watch); // 비디오 디테일 
browseRouter.get("/video/:id", video); // 북마크 


//post
browseRouter.post("/bookmark", addbookmark, delBookmark); // 북마크 
browseRouter.post("/score", starScore);

// 라우터 내보내기
module.exports = browseRouter;
