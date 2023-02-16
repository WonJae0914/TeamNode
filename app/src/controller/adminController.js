


const adminHome = (req, res) => {   //
    res.render('admin_home.ejs');
};

const adminWriteG = (req, res) => {
    res.render('admin_write.ejs');
};

const adminWriteP = async (req, res) => {
    await function (req, res) {

    }
};

app.post('/admin/write/add', upload.upload , async function (req, res) {

    
        await db.collection('counter').findOne({ name: '게시물 개수' }, //counter 
             function (err, result) {                             //게시글 카운팅 콜렉션
                 console.log(result.totalpost);
                 let total = result.totalpost;   //총 게시물 개수

                 var put = {
                     _id: total + 1,
                     // 작성자: req.user._id,
                     제목: req.body.title,
                     설명: req.body.description,
                     작성날짜: new Date().toLocaleString(),
                     경로: "/movies/" + req.files.profile[0].filename,
                     사진경로: "/images/" + req.files.profileImg[0].filename,
                     삭제: "N",
                     삭제날짜: "N"
                 }

                 //게시물개수에 +1한 번호를 id로 부여
           await  db.collection('post').insertOne(put,
                     function (err, result) {
                         console.log('저장완료');
                         db.collection('counter').updateOne({ name: '게시물 개수' },
                             { $inc: { totalpost: 1 } }, function (err, result) {
                                 if (err) { return console.log(err); }
                             })
                     });
             });

         })
         res.redirect('/admin/list')
});



//관리자 작성페이지 끝 --------------------------------------------------


// 관리자 게시판 리스트
app.get('/admin/list', function (req, res) {
 db.collection('post').find({ 삭제: 'N' }).toArray(function (err, result) {
     res.render('admin_list.ejs', { posts: result });
 });

});
// 관리자 게시판 상세보기
app.get('/admin/detail/:id', function (req, res) {
 db.collection('post').findOne({ _id: parseInt(req.params.id) }, function (err, result) {
     res.render('admin_detail.ejs', { data: result });
 });
});
//관리자 게시판 삭제(fake)
app.put('/admin/detail/delete', function (req, res) {
 db.collection('post').updateOne({ _id: parseInt(req.body._id) },
     {
         $set:
         {
             삭제: 'Y',
             삭제날짜: new Date().toLocaleString()
         }

     },
     function (err, result) {
         console.log("삭제완료")
         res.status(200).send({ message: '성공했습니다.' })
         // res.redirect("/admin/list");
     })
});


//관리자 게시판 수정
app.get('/admin/edit/:id', function (req, res) {
 db.collection('post').findOne({ _id: parseInt(req.params.id) }, function (err, result) {
     console.log(result);
     res.render('admin_edit.ejs', { post: result });
 });
})
app.put('/admin/edit', function (req, res) {

 req.body._id = parseInt(req.body._id);
 db.collection('post').updateOne({ _id: parseInt(req.body.id) },
     {
         $set:
         {
             제목: req.body.title,
             설명: req.body.description,
             수정날짜: new Date().toLocaleString(),
         }
     },
     function (err, result) {
         console.log("수정완료");
         res.redirect("/admin/list")
     })
});

