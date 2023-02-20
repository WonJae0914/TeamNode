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
            return cb(new Error('Only images are allowed'), false);
        } else {
            return cb(null, true);
        }
    }
    else{
        return cb(null, false);
    }
};


var storage = multer.diskStorage({
    destination: (req, file, cb) => { // setting destination of uploading files        

        if (file.fieldname == "profile") {
            cb(null, './src/public/movies');
        } else { // else uploading image
            cb(null, './src/public/img');
        }
    },
    filename: function (req, file, cb) {

        cb(null, file.originalname)
    },

    limits: {
        fileSize: 10737418240 //10gb
    }
});

var uploading = multer({ storage: storage, fileFilter: uploadFilter });
const upload = uploading.fields([
    { name: 'profile', maxCount: 1 },
    { name: 'profileImg', maxCount: 1 }
])

module.exports = upload;