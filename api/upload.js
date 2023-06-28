const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const express = require('express');
const router = express.Router();

const UPLOADS_DIR = path.join(__dirname, '../pages/uploads');

router.post('/', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ error: 'No files were uploaded.' });
    }

    console.log({ files: req.files });
    const file = req.files.image;
    const uniqueFileName = `${uuidv4()}-${file.name}`;

    file.mv(path.join(UPLOADS_DIR, uniqueFileName), (error) => {
        if (error) {
            console.error('Error saving image:', error);
            return res.status(500).json({ error: 'Failed to save image.' });
        }

        const imageUrl = `/home/javierc/Proyectos/tfg-nextjs/pages/uploads/${uniqueFileName}`;
        res.json({ imageUrl });
    });
});

module.exports = router;