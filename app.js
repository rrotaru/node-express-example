'use strict';
require('dotenv').config();
var session = require('cookie-session');
var express = require('express');
var bodyparser = require('body-parser');
var app = express();
var router = express.Router();
var api = require('./routes/api');
var things = require('./routes/things');
require('./controllers/db');

app.use(session({name: 'robs_cookie', keys: ['notasecret'], maxAge: 24 * 60 * 60 * 1000}));
app.use(bodyparser.urlencoded({extended: true}));

app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.static('./public'));

app.use(require('flash')());
/*app.use(function (req, res, next) {
  // flash a message 
  console.log(req.session);
  req.flash('info', 'Hello from Rob!');
  next();
})*/

app.use('/api', api);
app.use('/things', things);

app.disable('etag');

// Default request handler
app.use((req, res) => {
    res.end("404 not found");
});

module.exports = app;