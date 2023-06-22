import reko_client from './lib/aws';
import vision_client from './lib/google';
import cv_client from './lib/azure';

export const fetchAmazonAPI = (image) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            const imageBytes = new Uint8Array(event.target.result);

            const params = {
                Image: { Bytes: imageBytes },
                MaxLabels: 8,
                MinConfidence: 60,
            };

            reko_client.detectLabels(params, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    const labels = data.Labels;
                    resolve(labels);
                }
            });
        };

        reader.onerror = (error) => {
            reject(error);
        };

        reader.readAsArrayBuffer(image);
    });
};

/*export const fetchGoogleAPI = (image) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            const base64Image = event.target.result;
            const buffer = Buffer.from(base64Image, 'base64');
            const requestImage = { content: buffer };

            vision_client
                .labelDetection(requestImage)
                .then(([google_labels]) => {
                const labels = google_labels.labelAnnotations;
                const descriptions = labels
                    .slice(0, 5)
                    .map((label) => label.description)
                    .join(', ');
                resolve(descriptions);
                })
                .catch((error) => {
                reject(error);
                });
        };

        reader.onerror = (error) => {
            reject(error);
        };

        reader.readAsDataURL(image);
    });
};*/

export const fetchAzureAPI = (image) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            const base64Image = event.target.result;
            const image = { data: base64Image };
            cv_client
                .analyzeImage(image, { visualFeatures: ['Description'] })
                .then((image_analysis) => {
                    if (image_analysis.description.captions.length > 0) {
                        const captions = image_analysis.description.captions;
                        const first_caption = captions[0].text;

                        translate(first_caption, { from: 'en', to: 'es' })
                        .then((translated_caption) => {
                            resolve(translated_caption);
                        })
                        .catch((error) => {
                            reject(error);
                        });
                    } else {
                        const with_tags = image_analysis.description.tags.slice(0, 3).join(', ');

                        translate(with_tags, { from: 'en', to: 'es' })
                        .then((translated_caption) => {
                            resolve(translated_caption);
                        })
                        .catch((error) => {
                            reject(error);
                        });
                    }
                })
                .catch((error) => {
                    reject(error);
                });
        };

        reader.onerror = (error) => {
            reject(error);
        };

        reader.readAsDataURL(image);
    });
};
