'use strict';
var express = require('express');
var router = express.Router();
var Thing = require('../models/thingModel');
var ObjectID = require('mongodb').ObjectID;
var db;
require('../controllers/mongodb')
.then(connection => { 
    console.log('mongodb module connected to db');
    db = connection.db('cscie31');
});

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

router.route('/things')
.get(function(req, res) {
    db.collection('things').find({}).toArray((err, result) => {
        if (result) {
            res.json(result);
        }
    });
    /*Thing.find({})
    .then(things => {
        res.json(things);
    });*/
})
.delete(function(req, res) {
    db.collection('things').deleteMany({}, (err, result) => {
        if (result) {
            res.json(result);
        }
    });
});

router.route('/things/:thing_id')
.get(function(req, res) { 
    db.collection('things').findOne({_id: ObjectID.createFromHexString(req.params.thing_id)}, (err, result) => {
        res.json(result);
    });
})

.delete(function(req, res, next) {   
    db.collection('things').deleteOne({_id: ObjectID.createFromHexString(req.params.thing_id)}, (err, result) => {
        res.json(result);
    });
});



router.route('/test')
    .post(function (req, res) { 
        res.end("I am a POST request"); 
    })   // Create
    .get(function (req, res) { 
        res.end("I am a GET request"); 
    })    // Read
    .put(function (req, res) {
        res.end("I am a PUT request"); 
    })    // Update
    .delete(function (req, res) {
        res.end("I am a DELETE request"); 
    }); // Destroy

module.exports = router;