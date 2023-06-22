const translate = require('@vitalets/google-translate-api');
const { ComputerVisionClient } = require('@azure/cognitiveservices-computervision');
const { CognitiveServicesCredentials } = require('@azure/ms-rest-azure-js');
const azure_keys = require('../../../public/passwords/key_azure.json');

// Microsoft Azure
const cv_client = new ComputerVisionClient(new CognitiveServicesCredentials(azure_keys.api_key), azure_keys.endpoint);
export default cv_client; 