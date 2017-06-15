const express = require('express');
const path = require('path');
const url = require('url');
const bodyParser = require('body-parser');
const expressJwt = require('express-jwt');
const config = require('./config.json');

const app = express();

app.set('port', (process.env.PORT || 3000));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (req, res, next) { //allow cross origin requests
    const allowedOrigins = ["http://localhost:4200", "http://localhost:3000"];
    var origin = req.headers.origin;
    if (allowedOrigins.indexOf(origin) > -1) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, charset, Authorization");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});


app.use(expressJwt({ secret: config.secret }).unless({ path: ['/users/login', '/users/signup'] }));
app.use('/users', require('./controllers/users.controller'));
app.use('/editor', require('./controllers/editer.controller'));

app.listen(app.get('port'), function () {
    console.log('Angular 4 Full Stack listening on port ' + app.get('port'));
});







module.exports = app;
