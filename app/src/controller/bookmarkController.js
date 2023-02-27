const User = require("../models/User");
const passport = require("../config/passport");
const MongoClient = require("mongodb-legacy").MongoClient;

let db;
MongoClient.connect(
  "mongodb+srv://kdKim:6r7r6e5!KD@cluster0.mo9rckf.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true },
  function (err, client) {
    if (err) {
      return console.log("DB연결 실패");
    }
    db = client.db("test");
    console.log("몽고디비 연결 성공");
  }
);

const addbookmark = async (req, res, next) =>{
  const {title} = req.query;
  const arrayBookmark = await User.findOne({id : req.user.id });

  try{
    if(arrayBookmark.bookmark.includes(title)==false){
        await User.findOneAndUpdate(
          { id : req.user.id },
          { $addToSet : {bookmark: title} },
          { returnOriginal: false }
        );
        res.status(200).json({ message: "Bookmark added successfully" });
        return res.end();
      } else {
        next();
      }
    }catch{
        return res.status(500).json({ error: "Internal server error" });
      }
       
  };

const delBookmark = async (req, res) =>{
  const {title} = req.query;
  const arrayBookmark = await User.findOne({id : req.user.id });
    try{
      await User.findOneAndUpdate(
        { id : req.user.id },
        { $pull : {bookmark: title} },
        { returnOriginal: false }
      );
       res.status(200).json({ message: "Bookmark delete successfully" });
    }
    catch{
       res.status(500).json({ error: "Internal server error" });
    }
  }

 module.exports = {
  addbookmark,
  delBookmark
}