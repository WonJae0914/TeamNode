"use strict"

//express 모듈 불러오기 
const express = require("express");
const browseRouter = express.Router();

//컨트롤러 불러오기 
const {browse, search} = require("../controller/browseController");
const watch = require("../controller/watchController");
const video = require("../controller/videoController");
const {addbookmark,delBookmark} = require("../controller/bookmarkController");
const starScore = require("../controller/scoreController")
const review = require("../controller/reviewController")
// const bookmark = require("../controller/bookmarkController");
const { isLoggedIn} = require("../controller/userController");

//get
browseRouter.get("/browse" ,isLoggedIn, browse); // 메인 페이지
browseRouter.get("/watch/:id", isLoggedIn,watch); // 비디오 디테일 
browseRouter.get("/video/:id",isLoggedIn ,video); // 북마크 
browseRouter.get("/search",isLoggedIn ,search) // 검색 

//post
browseRouter.post("/bookmark", isLoggedIn ,addbookmark, delBookmark); // 북마크 
browseRouter.post("/score", isLoggedIn, starScore); // 별점 
browseRouter.post("/watch/:id", isLoggedIn, review);

// 라우터 내보내기
module.exports = browseRouter;
