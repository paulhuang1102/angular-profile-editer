const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const Post = require('../models/post.model');
const User = require('../models/user.model');
const Q = require('q');

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
    var deferred = Q.defer();
    var model = req.body;
    var post = new Post;
    post.user_id = model.userId;
    post.name = model.postName;
    post.info = model.postInfo;
    post.images = model.postImages;
    post.save(function (err, post) {
        if (err) {
            deferred.reject("Fail to Add");
        } else {
            User.findOne({ _id: model.userId }, function (err, user) {
                if (err) {
                    console.log(err);
                    deferred.reject("Fail to Find User");
                }
                user.post.push(post._id);
                user.save();
                deferred.resolve("Success Add");
            })
        }

        deferred.promise.then(function (doc) {
            res.status(200);
        }).catch(function (err) {
            res.status(400).send(err);
        })

    })
});

router.post('/folder', function (req, res) {
    folderName = req.body.postName;
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