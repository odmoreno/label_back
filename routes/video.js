import express from 'express';

const router = express.Router();
const fs = require('fs');

const assets = 'public/videos';
const videName = 'test2'; // without extension

import Video from '../models/video';

// Get con todos los documentos
router.get('/videos', async(req, res) => {
    try {
      const videoDb = await Video.find();
      res.json(videoDb);
    } catch (error) {
      return res.status(400).json({
        mensaje: 'Ocurrio un error',
        error
      })
    }
});


// Get con parámetros
router.get('/video/:id', (req, res) => {
    const _id = req.params.id;
    try {
      //const videoDB = await Video.findOne({_id});
      //res.json(videoDB);
      console.log('Prueba')
      const path = `${assets}/${_id}.mp4`;
      fs.stat(path, (err, stat) => {
          // Handle file not found
            if (err !== null && err.code === 'ENOENT') {
                res.sendStatus(404);
            }
            const fileSize = stat.size
            const range = req.headers.range

            if (range) {

                const parts = range.replace(/bytes=/, "").split("-");
    
                const start = parseInt(parts[0], 10);
                const end = parts[1] ? parseInt(parts[1], 10) : fileSize-1;
                
                const chunksize = (end-start)+1;
                const file = fs.createReadStream(path, {start, end});
                // video/x-msvideo
                const head = {
                    'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                    'Accept-Ranges': 'bytes',
                    'Content-Length': chunksize,
                    'Content-Type': 'video/mp4',
                }
                
                res.writeHead(206, head);
                file.pipe(res);
            } else {
                const head = {
                    'Content-Length': fileSize,
                    'Content-Type': 'video/mp4',
                }
    
                res.writeHead(200, head);
                fs.createReadStream(path).pipe(res);
            }
      });

    } catch (error) {
      return res.status(400).json({
        mensaje: 'Ocurrio un error',
        error
      })
    }
});

// Get de prueba 
router.get('/video', (req, res) => {

    const path = `${assets}/${videName}.mp4`;

    fs.stat(path, (err, stat) => {

        // Handle file not found
        if (err !== null && err.code === 'ENOENT') {
            res.sendStatus(404);
        }

        const fileSize = stat.size
        const range = req.headers.range

        if (range) {

            const parts = range.replace(/bytes=/, "").split("-");

            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize-1;
            
            const chunksize = (end-start)+1;
            const file = fs.createReadStream(path, {start, end});
            // video/x-msvideo
            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': 'video/mp4',
            }
            
            res.writeHead(206, head);
            file.pipe(res);
        } else {
            const head = {
                'Content-Length': fileSize,
                'Content-Type': 'video/mp4',
            }

            res.writeHead(200, head);
            fs.createReadStream(path).pipe(res);
        }
    });
});




module.exports = router;