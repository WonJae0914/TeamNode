const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
mongoose.connect("mongodb://127.0.0.1:27017/teamNode");
//cmd에서 mongosh 명령어 실행 후 주소값 복사 , '/' 뒤로 원하는 db명을 작성

const db = mongoose.connection;

const handleOpen = () => console.log("✅Connected to DB");
const handleError = (error) => console.log("❌DB Error", error);

db.once("open", handleOpen);
db.on("error", handleError);
