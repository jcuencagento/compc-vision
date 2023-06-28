const { ImageAnnotatorClient } = require('@google-cloud/vision');

//Google Cloud
const vision_client = new ImageAnnotatorClient({
    keyFilename: '/home/javierc/Proyectos/tfg-nextjs/public/passwords/key_google.json',
});

export default  vision_client;