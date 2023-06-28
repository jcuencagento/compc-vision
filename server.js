const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const express = require('express');
const fileUpload = require('express-fileupload');
const cron = require('cron');
const uploadRouter = require('./api/upload');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();




app.prepare().then(() => {
    const server = express();

    server.use(express.json({ limit: '10mb' })); // Adjust the limit as per your requirement

    // Define your custom API routes or other middleware here
    server.use(fileUpload());
    server.use('/api/upload', uploadRouter);

    server.all('*', (req, res) => {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);
    });

    server.all('*', (req, res) => {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);
    });

    const job = new cron.CronJob('0 */30 * * * *', () => {
        require('./image-cleanup.js');
    });

    job.start();

    createServer(server).listen(3003, (err) => {
        if (err) throw err;
        console.log('Server is running on port 3003');
    });
});