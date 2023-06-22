import { requestAllAPIs } from './api';

export default async function handler(req, res) {
    const { image } = req.body;

    console.log({ image });

    requestAllAPIs(image, (err, response) => {
        if (err) {
            console.log('MAAAAAL');
            console.error({ err });
            res.status(500).json({ error: 'An error occurred' });
        } else {
            res.status(200).json(response);
        }
    });
}