"use strict"

const express = require("express");
const browse = require("../controller/browseController");
const watch = require("../controller/watchController");
const browseRouter = express.Router();

//get
browseRouter.get("/browse" , browse);
browseRouter.get("/watch", watch); 
 
module.exports = browseRouter;
