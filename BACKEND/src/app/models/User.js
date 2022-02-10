const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    email: {type: String, require: true},
    password: {type: String, require: true},
    name : {type: String, require: true},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})
module.exports = mongoose.model('User', User);