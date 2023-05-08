const mongoose = require('mongoose')

const newsSchema = mongoose.Schema({
    headLine: { type: String, default: null, required: true },
    image: { type: String, require: true },
    details: { type: String, default: null, required: true },
    link: { type: String, unique: true, required: true },
    author: { type: String, required: true },
    dateOfWrite: { type: Date, required: true },
});

module.exports = { newsSchema };