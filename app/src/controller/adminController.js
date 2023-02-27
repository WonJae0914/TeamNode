"use strict"

const MongoClient = require('mongodb-legacy').MongoClient;
var ObjectId = require('mongodb-legacy').ObjectId;
const url = require('url');

let db;
MongoClient.connect("mongodb+srv://kdKim:6r7r6e5!KD@cluster0.mo9rckf.mongodb.net/?retryWrites=true&w=majority"
    , { useNewUrlParser: true },
    function (err, client) {
        if (err) { return console.log('DB연결 실패'); }
        db = client.db('test');
        console.log("몽고디비 연결 성공");
    });

//관리자 홈
const adminHome = (req, res) => {   
    res.render('admin_home.ejs');
};

// 관리자 게시판 글쓰기 겟
const adminWriteG = (req, res) => {
    res.render('admin_write.ejs');
};
// 관리자 게시판 글쓰기 포스트
const adminWriteP = async function (req, res) {
    const result = await db.collection('counter').findOne({ name: '게시물 개수' });
    console.log(result.totalpost);
    const total = result.totalpost;
    const put = {
        _id: total + 1,
        // 작성자: req.user._id,
        제목: req.body.title.trim(),
        감독: req.body.director.trim(),
        주연: req.body.actor.trim(),
        출시년도: req.body.year,
        장르: req.body.category,
        설명: req.body.description.trim(),
        경로: "/movies/" + req.files.profile[0].filename,
        사진경로: "/img/" + req.files.profileImg[0].filename,
        작성날짜: new Date().toLocaleString(),
        삭제: "N",
        삭제날짜: "N",
    };
    const result2 = await db.collection('post').insertOne(put);
    console.log('저장완료');
    const result3 = await db.collection('counter').updateOne(
        { name: '게시물 개수' },
        { $inc: { totalpost: 1 } }
    );
    res.redirect('/admin/list');
};

//관리자 게시판 리스트
const adminList = async (req, res) => {
    const result = await db.collection('post').find({ 삭제: 'N' }).toArray();
    res.render('admin_list.ejs', { posts: result });
};

// 관리자 게시판 페이징
const adminListG = async function (req, res) {
    const parsedUrl = url.parse(req.url);
    const path = parsedUrl.pathname;
    var newone = path.replace(/^\/list\//, '').replace(/\d+$/, '') + '';
    const PAGE_SIZE = 3;
    const pageNumber = parseInt(req.params.page) || 1;
    const collection = db.collection('post');
    try {
        const total = await collection.countDocuments({ 삭제: { $eq: 'N' } });
        const totalPages = Math.ceil(total / PAGE_SIZE);
        const result = await collection.find({ 삭제: { $eq: 'N' } })
            .sort({ "_id": -1 })
            .skip((pageNumber - 1) * PAGE_SIZE)
            .limit(PAGE_SIZE)
            .toArray();
        const data = {
            posts: result,
            total: totalPages,
            path: newone
        }
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}
// 콘텐츠 삭제목록 페이징
const adminListDeleted = async function (req, res) {
    const parsedUrl = url.parse(req.url);
    const path = parsedUrl.pathname;
    var newone = path.replace(/^\/list\//, '').replace(/\d+$/, '') + '';
    const PAGE_SIZE = 1;
    const pageNumber = parseInt(req.params.page) || 1;
    const collection = db.collection('post');
    try {
        const total = await collection.countDocuments({ 삭제: { $eq: 'Y' } });
        const totalPages = Math.ceil(total / PAGE_SIZE);
        const result = await collection.find({ 삭제: { $eq: 'Y' } })
            .sort({ "_id": -1 })
            .skip((pageNumber - 1) * PAGE_SIZE)
            .limit(PAGE_SIZE)
            .toArray();
        const data = {
            posts: result,
            total: totalPages,
            path: newone
        }
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

// 관리자 게시판 상세보기
const adminDetail = async (req, res) => {
    const result = await db.collection('post').findOne({ _id: parseInt(req.params.id) })
    res.render('admin_detail.ejs', { data: result });
};

//관리자 게시판 삭제(fake)
const adminDelete = (req, res) => {
    db.collection('post').updateOne({ _id: parseInt(req.body._id) },
        {
            $set:
            {
                삭제: 'Y',
                삭제날짜: new Date().toLocaleString()
            }
        },
        function (err, result) {
            console.log('삭제성공');
            res.status(200).send('success');
        })
}

//관리자 게시판 수정 겟
const adminPutG = async (req, res) => {
    const result = await db.collection('post').findOne({ _id: parseInt(req.params.id) });
    res.render('admin_edit.ejs', { post: result })
}
//관리자 게시판 수정 포스트
const adminPutP = async (req, res) => {
    const result = await db.collection('post').updateOne({ _id: parseInt(req.body.id) },
        {
            $set:
            {
                제목: req.body.title.trim(),
                감독: req.body.director.trim(),
                주연: req.body.actor.trim(),
                출시년도: req.body.year,
                장르: req.body.category,
                설명: req.body.description.trim(),
                수정날짜: new Date().toLocaleString(),
            }
        });
    const message = function () {
        console.log("수정완료");
        res.redirect("/admin/list")
    }
    return message();
}

// 관리자 게시판 검색
const adminSearchList = (req, res) => {
    var condition = [
        {
            $search: {
                index: 'korean',
                text: {
                    query: req.query.value,
                    path: '제목'  // 제목날짜 둘다 찾고 싶으면 ['제목', '날짜']
                }
            }
        }
    ]
    console.log(req.query.value);
    db.collection('post').aggregate(condition).toArray((err, result) => {
        console.log(result);
        res.render('admin_search_list.ejs', { posts: result })
    })

};

// 회원관리 게시판 리스트
const adminUserList = async (req, res) => {
    const result = await db.collection('users').find().toArray();
    res.render('admin_user_list.ejs', { users: result });
};

// 회원관리 게시판 리스트 페이징
const adminUserListG = async function (req, res) {
    const PAGE_SIZE = 2;
    const pageNumber = parseInt(req.params.page) || 1;
    const collection = db.collection('users');
    try {
        const total = await collection.countDocuments();
        const totalPages = Math.ceil(total / PAGE_SIZE);
        const result = await collection.find()
            .sort({ "_id": -1 })
            .skip((pageNumber - 1) * PAGE_SIZE)
            .limit(PAGE_SIZE)
            .toArray();
        const data = {
            users: result,
            total: totalPages
        }
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

// 회원관리 게시판 상세보기
const adminUserDetail = async (req, res) => {
    var id = req.params.id;
    var o_id = new ObjectId(id);
    const result = await db.collection('users').findOne({ _id: o_id });
    res.render('admin_user_detail.ejs', { data: result });
};
// 회원관리 게시판 수정 겟
const adminUserPutG = async (req, res) => {
    var id = req.params.id;
    var o_id = new ObjectId(id);
    const result = await db.collection('users').findOne({ _id: o_id });
    res.render('admin_user_edit.ejs', { data: result })
};
const adminUserPutP = async (req, res) => {
    var id = req.body.id;
    var o_id = new ObjectId(id);
    const result = await db.collection('users').updateOne({ _id: o_id },
        {
            $set:
            {
                email: req.body.email.trim(),
                age:  parseInt(req.body.age),
                gender: req.body.gender.trim(),
                country: req.body.country,
                isOptedIn: req.body.opt
            }
        });
    const message = function () {
        console.log("회원정보 수정완료");
        res.redirect("/admin/user/list")
    }
    return message();
}

// 회원 탈퇴 
const adminUserQuit = (req, res) => {
    var id = req.body._id;
    var o_id = new ObjectId(id);
    db.collection('users').updateOne({ _id: o_id },
        {
            $set:
            {
                delete: true,
            }
        },
        function (err, result) {
            console.log('삭제성공');
            res.status(200).send('success');
        })
}


module.exports = {
    adminHome, adminWriteG, adminWriteP,
    adminList, adminDetail, adminDelete,
    adminPutG, adminPutP, adminSearchList, adminListG,
    adminUserList, adminUserDetail, adminUserListG,
    adminUserPutG, adminUserPutP, adminUserQuit,
    adminListDeleted
}
