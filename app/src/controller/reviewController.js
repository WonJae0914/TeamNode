const MongoClient = require('mongodb-legacy').MongoClient;

let db;
MongoClient.connect("mongodb+srv://kdKim:6r7r6e5!KD@cluster0.mo9rckf.mongodb.net/?retryWrites=true&w=majority"
    , { useNewUrlParser: true },
    function (err, client) {
        if (err) { return console.log('DB연결 실패'); }
        db = client.db('test');
    });

// 리뷰 DB에 저장하기
const review = async(req,res) => {
    const id = parseInt(req.params.id);
    const { review } = req.body;
    console.log(id)
    console.log(review)
    try {
        await db.collection('post').updateOne(
            {_id : id}, 
            { $addToSet : {review : review}})
        return res.redirect(`/watch/${id}`)
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    review
};