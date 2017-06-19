var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const db = mongoose.connection;
const config = require('../config.json');
const User = require('../models/user.model');
const Q = require('q');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

mongoose.connect(config.connectionString);
mongoose.Promise = global.Promise;

db.on('error', console.error.bind(console, 'connection error:'));

router.post('/signup', function (req, res) {
    var formData = req.body;
    var deferred = Q.defer();
    User.findOne({ email: formData.email }, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);
        if (user) {
            deferred.reject('E-Mail "' + formData.email + '" is already taken');
        } else {
            createUser();
        }

        function createUser() {
            var user = new User;
            user.email = formData.email;
            user.password = bcrypt.hashSync(formData.password, 10);
            user.name = formData.name;
            user.save(function (err, result) {
                if (err) deferred.reject(err.name + ': ' + err.message);
                deferred.resolve({
                    id: result._id,
                    email: result.email,
                    name: result.name,
                    token: jwt.sign({ sub: result._id }, config.secret)
                });
            })
        }
    });

    deferred.promise.then(function (user) {
        res.json(user);
    }).catch(function (err) {
        res.status(400).send(err);
    });
});

router.post('/login', function (req, res) {
    var deferred = Q.defer();
    var formData = req.body;
    User.findOne({ email: formData.email }, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);
        if (user && bcrypt.compareSync(formData.password, user.password)) {
            deferred.resolve({
                id: user._id,
                email: user.email,
                name: user.name,
                token: jwt.sign({ sub: user._id }, config.secret)
            })
        } else {
            deferred.resolve();
        }
    });

    deferred.promise.then(function (user) {
        if (user) {
            res.json(user);
        } else {
            res.status(401).send('Username or password is incorrect');
        }
    }).catch(function (err) {
        res.status(400).send(err);
    })
});

router.post('/profile', function (req, res) {
    var deferred = Q.defer();
    var userId = req.body.userId;
    User.findById(userId, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);
        if (user) {

            deferred.resolve({
                id: user._id,
                email: user.email,
                name: user.name,
                post: user.post
            });
        } else {
            deferred.resolve();
        }
    });

    deferred.promise.then(function (user) {
        if (user) {
            res.json(user);
        } else {
            res.sendStatus(404);
        }
    }).catch(function (err) {
        res.status(400).send(err);
    })
});

module.exports = router;