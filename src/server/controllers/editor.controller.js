const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const Post = require('../models/post.model');
const User = require('../models/user.model');
const Q = require('q');
const mongoose = require('mongoose');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

router.post('/upload/:id', function (req, res) {
    var folderName = req.params.id;
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            var dir = '../assets/uploads/' + folderName;
            // For Universal
            // var dir = './dist/assets/uploads/' + folderName;
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }
            cb(null, dir);
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    });

    var upload = multer({
        storage: storage
    }).array('uploads[]');

    upload(req, res, function (err) {
        if (err) {
            res.json({ error_code: 1, err_desc: err });
            console.log(err);
            return;
        }
        res.send('done');
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
            deferred.reject(err.name + ': ' + err.message);
        } else {
            User.findOne({ _id: model.userId }, function (err, user) {
                if (err) {
                    console.log(err);
                    deferred.reject(err.name + ': ' + err.message);
                }
                user.post.push(post._id);
                user.save();
                deferred.resolve(post._id);
            })
        }

        deferred.promise.then(function (id) {
            res.status(200).send(id);
        }).catch(function (err) {
            res.status(400).send(err);
        });

    })
});



router.post('/:id', function (req, res) {
    var deferred = Q.defer();
    var postId = req.params.id;
    Post.findOne({ _id: postId }, function (err, post) {
        if (err) deferred.reject(err.name + ':' + err.message);
        deferred.resolve(post);
    });

    deferred.promise.then(function (post) {
        res.json(post);
    }).catch(function (err) {
        res.status(404).send(err);
    })
});

router.put('/:id', function (req, res) {
    var deferred = Q.defer();
    var postId = req.params.id;
    var newPost = req.body.newPost;
    var removeItems = req.body.removeItems;
    Post.findByIdAndUpdate(postId, {
        $push: { "images": { $each: newPost.images } },
        "name": newPost.name,
        "info": newPost.info
    }, function (err, doc) {
        if (err) deferred.reject(err.name + ':' + err.message);
        if (doc) {
            Post.update({ _id: postId }, { $pullAll: { "images": removeItems } }, function (err, result) {
                if (err) deferred.reject(err.name + ':' + err.message);
                deferred.resolve(result);
            })
        }
    });

    deferred.promise.then(function (result) {
        res.status(200).send(result);
    }).catch(function (err) {
        console.log(err);
    })

});

router.post('/delete/:id', function (req, res) {
    var folderName = req.body.folderName;
    var removeItems = req.body.removeItems;

    if (removeItems.length == 0) {
        res.status(200).send('no item to delete');
        return;
    }
    removeItems.forEach(function (item) {
        fs.unlink('../assets/uploads/' + folderName + '/' + item, function (err) {
            if (err) throw err;
        })
    });
    res.status(200).send('no item to delete');
});
module.exports = router;