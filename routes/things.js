var express = require('express');
var router = express.Router();
var data = {};

router.get('/', function(req, res, next) {
    res.render('thing', {"thingname":"Bob"});
});

router.get('/:thingname', function(req, res, next) {
    res.render('thing', {"thingname":req.params.thingname});
});

module.exports = router;