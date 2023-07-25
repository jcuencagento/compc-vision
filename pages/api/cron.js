const fs = require('fs');
const path = require('path');
const UPLOADS_DIR = '/app/public/uploads';

export default function handler(req, res) {
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

    res.status(200).end('Job -> Deleting uploaded images if any...');
}
