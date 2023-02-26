const User = require("../models/User");
const passport = require("../config/passport");

const bookmark = async (req, res) =>{

    const title = req.query
    console.log("넘어갔나?")
    console.log(req.user.id)
    console.log(title);
    try{
      await User.findOneAndUpdate(
        { _id : req.user.id },
        { $set : {bookmark : title}} ,
        { returnOriginal: false },
      );
    }
    catch{
      console.error("북마크에러나고있음");
    }
    
   }

 module.exports = bookmark;