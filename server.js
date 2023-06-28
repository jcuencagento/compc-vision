const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const express = require('express');
const fileUpload = require('express-fileupload');
const cron = require('node-cron');
const uploadRouter = require('./api/upload');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();
    server.use(express.json({ limit: '10mb' }));
    server.use(fileUpload());
    server.use('/api/upload', uploadRouter);
    server.use('/uploads', express.static('/home/javierc/Proyectos/tfg-nextjs/pages/uploads'));
    server.all('*', (req, res) => {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);
    });

    const job = cron.schedule('* * * * *', () => {
        require('./image-cleanup.js');
    });

    job.start();
    createServer(server).listen(3003, (err) => {
        if (err) throw err;
        console.log('Server is running on port 3003');
    });
});