const mongoose = require('mongoose');
const Schema = mongoose.Schema

const Product = new Schema({
    title: {type: String, maxLength : 255, require: true},
    price: {type: Number, require: true},
    description: {type: String, maxLength: 1000},
    category: {type: String, maxLength: 255, require: true},
    image: {type: String, maxLength: 255, require: true},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})
module.exports = mongoose.model('Product', Product);