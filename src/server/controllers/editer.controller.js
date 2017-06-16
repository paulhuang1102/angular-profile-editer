const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');

var folderName = '';

router.post('/upload', function (req, res) {
    var upload = multer({ //multer settings
        storage: storage
    }).array('uploads[]');

    upload(req, res, function (err) {
        if (err) {
            res.json({ error_code: 1, err_desc: err });
            console.log(err);
            return;
        }
        res.send('done');
        folderName = '';
        userId = '';
    });

});

router.post('/save', function (req, res) {
    var postName = req.body.postName;
    var postInfo = req.body.postInfo;
    console.log(postName, postInfo);
});

router.post('/folder', function (req, res) {
   folderName = req.body.postName
    res.sendStatus(200);
});


var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        var dir = './uploads/' + folderName;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.originalname);
    }
});
module.exports = router;