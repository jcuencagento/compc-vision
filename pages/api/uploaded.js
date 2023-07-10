const fs = require('fs');
const path = require('path');

export default function handler(req, res) {
    if (req.method === 'GET') {
        console.log('Vamos a pedir la imagen');
        const { imageName } = req.query;
        if (!imageName) {
            return res.status(400).json({ error: 'Missing image name' });
        }

        const filePath = path.join(process.cwd(), 'pages', 'uploads', imageName);
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: 'Image not found' });
        }

        const imageStream = fs.createReadStream(filePath);
        imageStream.pipe(res);
    } else {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
}
