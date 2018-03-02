var express = require('express');
var app = express();
var router = express.Router();
var api = require('./routes/api');
var things = require('./routes/things');

router.route('/test')
.post(function(req, res) {})   // Create
.get(function(req, res) {})    // Read
.put(function(req, res) {})    // Update
.delete(function(req, res) {}) // Destroy

app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.static('./public'));
app.use('/api', api);
app.use('/things', things);

app.disable('etag');

app.use((req, res)=>{
   res.end("hello from express!")
});

module.exports = app;