"use strict"

const express = require("express");
const browse = require("../controller/browseController");
const watch = require("../controller/watchController");
const video = require("../controller/videoController");
const {addbookmark,delBookmark} = require("../controller/bookmarkController");
// const bookmark = require("../controller/bookmarkController");
const browseRouter = express.Router();

//get
browseRouter.get("/browse" , browse);
browseRouter.get("/watch/:id", watch); 
browseRouter.get("/video/:id", video); 

//post
browseRouter.post("/bookmark", addbookmark, delBookmark);

 
module.exports = browseRouter;
