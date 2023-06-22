import { fetchAmazonAPI, fetchGoogleAPI, fetchAzureAPI } from './requests';

export const requestAllAPIs = (image, cb) => {
    Promise.all([
        fetchAmazonAPI(image),
        //fetchGoogleAPI(image),
        fetchAzureAPI(image)
    ])
        .then(results => cb(null, transformResponsesToImageDescriptions(image, results) || []))
        .catch(err => cb(err));
};

const transformResponsesToImageDescriptions = (image, results) => {
    const aws_response = results[0];
    const google_response = results[1];
    const azure_response = results[2];

    console.log({ aws_response });
    console.log({ google_response });
    console.log({ azure_response });

    const image_description = {
        image_name: image,
        aws_description: aws_response,
        google_description: google_response,
        azure_description: azure_response
    };

    return image_description;
}
