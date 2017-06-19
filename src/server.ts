import "reflect-metadata";
import "zone.js/dist/zone-node";
import { platformServer, renderModuleFactory } from "@angular/platform-server";
import { enableProdMode } from "@angular/core";
import { AppServerModuleNgFactory } from '../dist/ngfactory/src/app/app.server.module.ngfactory';
import * as express from "express";
import { readFileSync } from "fs";
import { join } from "path";
import * as expressJwt from "express-jwt";
import * as bodyParser from "body-parser";


const port = 3000;

enableProdMode();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let template = readFileSync(join(__dirname, '..', 'dist', 'index.html')).toString();

app.engine('html', (_, options, callback) => {
    const opts = { document: template, url: options.req.url };

    renderModuleFactory(AppServerModuleNgFactory, opts)
        .then(html => callback(null, html));
});


app.use(function (req, res, next) { //allow cross origin requests
    const allowedOrigins = ["http://localhost:4200", "http://localhost:3000"];
    let origin = req.headers.origin;
    if (allowedOrigins.indexOf(origin) > -1) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, charset, Authorization");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});




app.set('view engine', 'html');
app.set('views', 'src');

app.get('*.*', express.static(join(__dirname, '..', 'dist')));

app.get('*', (req, res) => {
    res.render('index', { req });
});
app.use(expressJwt({ secret: "My Super Secret" }).unless({ path: ['/users/login', '/users/signup'] }));
app.use('/users', require('./server/controllers/users.controller'));
app.use('/editor', require('./server/controllers/editer.controller'));
app.listen(port, () => {
    console.log('Angular 4 Full Stack listening on port ' + port);
});
