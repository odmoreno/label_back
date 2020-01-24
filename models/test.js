const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = new Schema({
    name: String,
    date:{type: Date, default: Date.now},
})

module.exports = mongoose.model('simpleVideo', videoSchema);
