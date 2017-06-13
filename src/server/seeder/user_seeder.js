var User = require('../models/user.model');
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/editor');

var users = [
    new User({
        email: 'test1@test.com',
        password: '12345',
        name: 'user1'
    }),
    new User({
        email: 'test2@test.com',
        password: '12345',
        name: 'user2'
    })
];


var done = 0;
for (var i = 0; i < users.length; i++) {
   users[i].save(function (err, result) {
        done++;
        if (done === users.length) {
            console.log('enter DB');
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}
