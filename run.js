
const mongoose = require('mongoose');
const path = require('path');


const simpleVideo = require('./models/test');

const uri = 'mongodb+srv://odmoreno:odmoreno@cluster0-q4hgx.mongodb.net/tagger?retryWrites=true&w=majority'
const options = {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true};

const par = path.join(__dirname, 'public/videos')
const files = ['2074', '2077', '2083', '2085', '2096', '2097', '2100']
mongoose.connect(uri, options).then(
    /** ready to use. The `mongoose.connect()` promise resolves to mongoose instance. */
    () => { 
        console.log('Conectado a DB')
        console.log(files) 
        files.forEach(function (file){
            console.log(file);
            let video = { 'name': video}
            try {
                let videoDB = simpleVideo.create(video);
                console.log(videoDB)
            } catch (error) {
                console.log(error)
            }
        });
    },
    /** handle initial connection error */
    err => { console.log(err) }
);
