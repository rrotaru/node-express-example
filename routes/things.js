'use strict';
var express = require('express');
var router = express.Router();
var Thing = require('../models/thingModel');

router
.get('/', function(req, res, next) {
    Thing.find({})
    .then(things => {
        res.render('things', {"things": things});
    });
})

.post('/', function(req, res, next) {
    var thing = new Thing({
        name: req.body.name,
        color: req.body.color,
        birthday: req.body.birthday,
        friends: []
    });
    thing.save()
    .then(() => {
        res.redirect('/things');
    });
});

router
.get('/:thingid', function(req, res, next) {
    Thing.findById(req.params.thingid)
    .then(thing => {
        res.render('thing', {"thing": thing});
    });
});

module.exports = router;