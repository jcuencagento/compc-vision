const { ImageAnnotatorClient } = require('@google-cloud/vision');

//Google Cloud
const vision_client = new ImageAnnotatorClient({
    keyFilename: 'public/passwords/key_google.json',
});

export default  vision_client;