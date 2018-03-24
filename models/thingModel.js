'use strict';
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var thingSchema = new Schema({
    name: String,
    color: String,
    birthday: Date,
    friends: [Schema.Types.ObjectId]
});

thingSchema.virtual('age').get(function() {
    return Math.floor((new Date() - new Date(this.birthday)) / (1000 * 60 * 60 * 24 * 365));
});

module.exports = mongoose.model("Thing", thingSchema);