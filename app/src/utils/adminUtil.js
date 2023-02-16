const multer = require('multer');
const path = require('path');


const uploadFilter = function (req, file, cb) {
    if (file.fieldname == "profile") {
        var ext = path.extname(file.originalname);
        if (ext !== '.mp4') {
            return cb(new Error('Only mp4 are allowed'), false);
        } else {
            return cb(null, true);
        }

    } else if (file.fieldname == "profileImg") {
        var ext = path.extname(file.originalname);
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
            return callback(new Error('Only images are allowed'), false);
        } else {
            return cb(null, true);
        }
    }
    else{
        return cb(null, false);
    }
};


var storageImg = multer.diskStorage({
    destination: (req, file, cb) => { // setting destination of uploading files        

        if (file.fieldname == "profile") {
            cb(null, './public/movies');
        } else { // else uploading image
            cb(null, './public/images');
        }
    },
    filename: function (req, file, cb) {

        cb(error, file.originalname)
    },

    limits: {
        fileSize: 10737418240 //10gb
    }
});

var uploadImg = multer({ storage: storageImg, fileFilter: uploadFilter });
const upload = uploadImg.fields([
    { name: 'profile', maxCount: 1 },
    { name: 'profileImg', maxCount: 1 }
])

module.exports = upload;