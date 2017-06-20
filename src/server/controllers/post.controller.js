const express = require('express');
const router = express.Router();
const Post = require('../models/post.model');
const Q = require('q');
const mongoose = require('mongoose');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

router.post('/', function (req, res) {
    var deferred = Q.defer();
    var postId = req.body.postId;
    Post.findOne({ _id: postId }, function(err, post) {
        if (err) deferred.reject(err.name + ': ' + err.message);
        deferred.resolve(post);
    });

    deferred.promise.then(function(post) {
        res.json(post);
    }).catch(function(err) {
        res.status(400).send(err);
    })
});
module.exports = router;