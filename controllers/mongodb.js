'use strict';
require('dotenv').config()
const mongodb = require('mongodb');

// Use connect method to connect to the server
async function getdb() {
    return await mongodb.MongoClient.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_DATABASE}?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin`);
}

module.exports = getdb();

