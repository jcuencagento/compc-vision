const translate = require('@vitalets/google-translate-api');
import { createClient } from '@google-cloud/vision';
const google_keys = require('../../../public/passwords/key_google.json');

//Google Cloud
const vision_client = new ImageAnnotatorClient({ google_keys });
export default  vision_client;