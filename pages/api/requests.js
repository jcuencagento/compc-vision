import reko_client from './lib/aws';
import vision_client from './lib/google';
import cv_client from './lib/azure';
const translate = require('translate-google');
import fs from 'fs';

export const fetchAmazonAPI = (image) => {
    console.log({ imageAWS: image });
    console.log({ split: image.split('uploads\\') });
    const image_url = '/app/pages/uploads/' + image.split('uploads\\')[1];
    console.log({ image_url });
    return new Promise((resolve, reject) => {
        fs.readFile(image_url, (err, imageBytes) => {
            if (err) {
                reject(err);
            } else {
                const params = {
                    Image: { Bytes: imageBytes },
                    MaxLabels: 8,
                    MinConfidence: 60,
                };

                reko_client.detectLabels(params, (err, data) => {
                    if (err) {
                        resolve('Error en Amazon API...');
                    } else {
                        const labels = [...new Set(data.Labels.map(obj => obj.Name))]
                            .slice(0, 5)
                            .join(', ');
                        translate(labels, { from: 'en', to: 'es' })
                            .then((translated_caption) => {
                                resolve(translated_caption);
                            })
                            .catch((error) => {
                                reject(error);
                            });
                    }
                });
            }
        });
    });
};



export const fetchGoogleAPI = (image) => {
    const image_url = '/app/pages/uploads/' + image.split('uploads\\')[1];
    console.log({ imageGoogle: image_url });
    return new Promise((resolve, reject) => {
        /*
        const imageBytes = Buffer.from(image.buffer, 'base64');
        const requestImage = { content: imageBytes };
        */
        vision_client
            .labelDetection(image_url)
            .then(([google_labels]) => {
                const labels = google_labels.labelAnnotations;
                const descriptions = labels
                    .slice(0, 5)
                    .map((label) => label.description)
                    .join(', ');
                translate(descriptions, { from: 'en', to: 'es' })
                    .then((translated_caption) => {
                        resolve(translated_caption);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            })
            .catch((_error) => {
                resolve('Error en Google API...');
            });
      });
};

export const fetchAzureAPI = (image) => {
    return new Promise((resolve, reject) => {
        const web_url = 'http://compcvision.duckdns.org/uploads/';
        const image_url = image.split('uploads\\')[1];
        console.log({ imageAzure: web_url + image_url });
        cv_client
            .analyzeImage(web_url+image_url, { visualFeatures: ['Description'] })
            .then((image_analysis) => {
                console.log({ image_analysis });
                if (image_analysis.description.captions.length > 0) {
                    const captions = image_analysis.description.captions;
                    const first_caption = captions[0].text;
                    console.log({ first_caption });

                    translate(first_caption, { from: 'en', to: 'es' })
                        .then((translated_caption) => {
                            resolve(translated_caption);
                        })
                        .catch((error) => {
                            reject(error);
                        });
                } else {
                    const with_tags = image_analysis.description.tags.slice(0, 3).join(', ');
                    console.log({ with_tags });

                    translate(with_tags, { from: 'en', to: 'es' })
                        .then((translated_caption) => {
                            resolve(translated_caption);
                        })
                        .catch((error) => {
                            reject(error);
                        });
                }
            })
            .catch((_error) => {
                console.log({ _error });
                resolve('Error en Microsoft API...');
            });
    });
};