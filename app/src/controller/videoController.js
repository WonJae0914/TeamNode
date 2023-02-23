"use strict"

const fs = require("fs");
const path = require("path");

const MongoClient = require('mongodb-legacy').MongoClient;
let db;
MongoClient.connect("mongodb+srv://kdKim:6r7r6e5!KD@cluster0.mo9rckf.mongodb.net/?retryWrites=true&w=majority"
    , { useNewUrlParser: true },
    function (err, client) {
        if (err) { return console.log('DB연결 실패'); }
        db = client.db('test');
        console.log("몽고디비 연결 성공");
    });

const video = function (req, res) {
    // 요청 헤더에서 range 가져오기
    const range = req.headers.range; 
    // 요청 받은 range 없으면 상태코드400 보내기
    if (!range) {
        res.status(400).send("Requires Range header");
    };
     // 파라미터로 전달된 ID 값 파싱
    const id = parseInt(req.params.id);
    // MongoDB에서 ID 값에 해당하는 동영상 데이터 조회
    const collection = db.collection('post');
    collection.findOne({
      _id : id
      }, function(err, result){
        // 에러 발생
        if (err) { 
            console.log('동영상 데이터 조회 실패');
            return res.status(500).send('Internal Server Error');
        }
        // 조회된 결과가 없을 경우
        if (!result) {
            return res.status(404).send('Not Found');
        }
        // 조회된 결과가 있을 경우 요청된 동영상 파일의 경로 생성
        const videoPath = "public/movices/test_video.mp4";
        // 파일의 상태를 동기적으로 가져오기
        const stat = fs.statSync(videoPath)
        // 파일 크기 
        const videoSize = stat.size;

        const CHUNK_SIZE = 10 ** 6; // 1MB
        // start값 숫자로 변환
        const start = Number(range.replace(/\D/g, ""));
        // end값 숫자로 변환 and end값 없을 경우 "파일크기-1" 값 할당
        const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

        // 전송할 데이터 크기
        const contentLength = (end - start) + 1;
        const headers = {
            "Content-Range": `bytes ${start}-${end}/${videoSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": contentLength,
            "Content-Type": "video/mp4",
        };

        //상태코드 206 반환 / 206 : 클라이언트에서 복수의 스트림을 분할 다운로드를 하고자 범위 헤더를 전송 성공시 사용
        res.writeHead(206, headers);

        // 비디오 읽기 스트림 생성
        const videoStream = fs.createReadStream(videoPath, { start, end });

        // 클라이언트로 스트리밍 반환
        videoStream.pipe(res);
        }
    );
}
// const video = (req, res) =>{ 
//     // Ensure there is a range given for the video
//     const range = req.headers.range;
//     if (!range) {
//         res.status(400).send("Requires Range header");
//     }

//     let path = "./src/public/movies/test_video.mp4";
//     const videoPath = path;
//     const videoSize = fs.statSync(path).size;

//     const CHUNK_SIZE = 10 ** 6; // 1MB
//     const start = Number(range.replace(/\D/g, ""));
//     const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

//     // Create headers
//     const contentLength = end - start + 1;
//     const headers = {
//         "Content-Range": `bytes ${start}-${end}/${videoSize}`,
//         "Accept-Ranges": "bytes",
//         "Content-Length": contentLength,
//         "Content-Type": "video/mp4",
//     };

//     // HTTP Status 206 for Partial Content
//     res.writeHead(206, headers);

//     // create video read stream for this particular chunk
//     const videoStream = fs.createReadStream(videoPath, { start, end });

//     // Stream the video chunk to the client
//     videoStream.pipe(res);
// }

module.exports = video;