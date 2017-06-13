const express = require('express');
const path = require('path');
const url = require('url');
const fs = require('fs');
const bodyParser = require('body-parser');
const multer = require('multer');
const expressJwt = require('express-jwt');
const config = require('./config.json');


const app = express();

app.set('port', (process.env.PORT || 3000));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(function (req, res, next) { //allow cross origin requests
    const allowedOrigins = ["http://localhost:4200", "http://localhost:4000"];
    var origin = req.headers.origin;
    if (allowedOrigins.indexOf(origin) > -1) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, charset");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});


app.use(expressJwt({ secret: config.secret }).unless({ path: ['/users/login', '/users/register'] }));
app.use('/users', require('./controllers/users.controller'));

app.listen(app.get('port'), function () {
    console.log('Angular 4 Full Stack listening on port ' + app.get('port'));
});


var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        var dir = './uploads/';
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


app.post('/upload', function (req, res) {
    console.log('upload');
    var upload = multer({ //multer settings
        storage: storage
    }).array('uploads[]');

    upload(req, res, function (err) {
        if (err) {
            res.json({ error_code: 1, err_desc: err });
            console.log(err);
            return;
        }
        res.json({ error_code: 0, err_desc: null });
    });
});

app.post('/save', function (req, res) {
    console.log('save');
    res.json({ 'file': req.body });
});


module.exports = app;
