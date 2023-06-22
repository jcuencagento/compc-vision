const translate = require('@vitalets/google-translate-api');
const AWS = require('aws-sdk');
const aws_keys = require('../../../public/passwords/key_aws.json');

//Amazon Web Services
AWS.config.update({
    accessKeyId: aws_keys.aws_access_key_id,
    secretAccessKey: aws_keys.aws_secret_access_key,
    region: 'us-east-2'
});

const reko_client = new AWS.Rekognition();
export default reko_client;
