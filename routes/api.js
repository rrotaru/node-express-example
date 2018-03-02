var express = require('express');
var router = express.Router();
var data = require('../data.json');

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

router.route('/things')
.get(function(req, res) {
    res.json(data);
});

router.route('/things/:thing_id')
.get(function(req, res) { 
    console.log("Requesting thing", req.params.thing_id); 
    res.json(data.things.filter(thing => { 
        if (thing.id === req.params.thing_id) 
            return thing; 
    }).pop());
})

module.exports = router;