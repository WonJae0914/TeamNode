"use strict"
// const Content = require("../models/Content");

// 비디오 데이터 불러오기 
// const watch = function(req, res){
//   const findContent = Content.find({});
//   return res.render("watch", {
//     title : "Video List",
//     findContent 
//   });
// };

const watch = (req, res) =>{ 
  res.render("watch")
}

module.exports = watch; 