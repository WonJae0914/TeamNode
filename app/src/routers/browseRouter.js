"use strict"

const express = require("express");
const browse = require("../controller/browseController");
const watch = require("../controller/watchController");
const video = require("../controller/videoController");
// const bookmark = require("../controller/bookmarkController");
const browseRouter = express.Router();

//get
browseRouter.get("/browse" , browse);
browseRouter.get("/watch/:id", watch); 
browseRouter.get("/video/:id", video); 

//poset
browseRouter.post("/bookmark", bookmark);


 
module.exports = browseRouter;
