import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const videoSchema = new Schema({
    videoId: {type: String, required: [true, 'ID obligatorio']},
    sala: String,
    tema: String,
    date:{type: Date, default: Date.now},
    taggeado: {type: Boolean, default: false}
})

module.exports = mongoose.model('Video', videoSchema);
