'use strict';
require('dotenv').config();
var express = require('express');
var bodyparser = require('body-parser');
var app = express();
var router = express.Router();
var api = require('./routes/api');
var things = require('./routes/things');
var db = require('./controllers/db');

app.use(bodyparser.urlencoded({extended: true}));

app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.static('./public'));
app.use('/api', api);
app.use('/things', things);

app.disable('etag');

// Default request handler
app.use((req, res) => {
    res.end("404 not found");
});

module.exports = app;