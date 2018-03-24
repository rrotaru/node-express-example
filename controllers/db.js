'use strict';
require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_DATABASE}?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin`)
.catch(() => {
    console.log('There was an error connecting to DB');
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('mongoose module connected to db');
});

module.exports = db;