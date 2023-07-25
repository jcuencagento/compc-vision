const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const express = require('express');
const fileUpload = require('express-fileupload');
const uploadRouter = require('./api/upload');
const fs = require('fs');
const path = require('path');
const cron = require('node-cron');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const UPLOADS_DIR = '/app/public/uploads';

// Function to delete uploaded images
const deleteUploadedImages = () => {
    fs.readdir(UPLOADS_DIR, (err, files) => {
        if (err) {
            console.error('Error reading uploads directory:', err);
            return;
        }

        files.forEach((file) => {
            fs.unlink(path.join(UPLOADS_DIR, file), (error) => {
                if (error) {
                    console.error('Error deleting image:', error);
                }

                console.log(' - image deleted');
            });
        });
    });
};

app.prepare().then(() => {
    const server = express();
    server.use(express.json({ limit: '10mb' }));
    server.use(fileUpload());
    server.use('/api/upload', uploadRouter);
    server.use('/uploads', express.static('/home/javierc/Proyectos/tfg-nextjs/public/uploads'));
    server.all('*', (req, res) => {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);
    });

    // Delete uploaded images every minute
    cron.schedule('* * * * *', deleteUploadedImages); 
    createServer(server).listen(3003, (err) => {
        if (err) throw err;
        console.log('Server is running on port 3003 locally');
    });
});