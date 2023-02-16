const MongoClient = require('mongodb-legacy').MongoClient;

let db;
let connect = MongoClient.connect("mongodb+srv://kdKim:6r7r6e5!KD@cluster0.mo9rckf.mongodb.net/?retryWrites=true&w=majority"
    , { useNewUrlParser: true },
    function (err, client) {
        if (err) { return console.log('DB연결 실패'); }
        db = client.db('todoapp');
        console.log("디비접속완료");
    });
module.exports = { connect, db};
