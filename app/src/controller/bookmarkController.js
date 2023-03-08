// 모델에서 유저 모델 불러오기 
const User = require("../models/User");
// 패스포트 불러오기 (로그인한 유저 세션 정보 받기 위함)
const passport = require("../config/passport");
// DB 연결을 위한 몽고 클라이언트 불러오기 
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

// 북마크 생성 함수 
const addbookmark = async (req, res, next) =>{
  // 요청 받은 컨텐츠 타이틀 데이터
  const {title} = req.query;
  // 접속한 유저 정보 가져오기
  const arrayBookmark = await User.findOne({id : req.user.id });
  // 접속한 유저에 요청 받은 컨텐츠 타이틀 저장
  try{
    if(arrayBookmark.bookmark.includes(title)==false){ // 유저 DB에 요청받은 타이틀 DB가 있는지 확인
        await User.findOneAndUpdate(
          { id : req.user.id },
          { $addToSet : {bookmark: title} },
          { returnOriginal: false }
        );
        res.status(200).json({ message: "북마크가 추가되었습니다." });
        return res.end();
      } else {
        next();
      };
    }catch{
        return res.status(500).json({ error: "북마크 추가 에러" });
      };
       
  };
  
// 북마크 제거 함수
const delBookmark = async (req, res) =>{
  // 요청 받은 컨텐츠 타이틀 데이터
  const {title} = req.query;
  // 접속한 유저 정보 가져오기
  const arrayBookmark = await User.findOne({id : req.user.id });
  // 접속한 유저에 요청 받은 컨텐츠 타이틀 삭제
    try{
      await User.findOneAndUpdate(
        { id : req.user.id },
        { $pull : {bookmark: title} },
        { returnOriginal: false }
      );
       res.status(200).json({ message: "북마크가 삭제되었습니다." });
    }
    catch{
       res.status(500).json({ error: "북마크 삭제 에러" });
    };
  };

// 함수 내보내기(라우터에서 사용)
 module.exports = {
  addbookmark,
  delBookmark
}