import { requestAllAPIs } from './api';

export default async function handler(req, res) {
    requestAllAPIs(req.body.image, (err, response) => {
        if (err) {
            console.error({ err });
            res.status(500).json({ error: 'An error occurred' });
        } else {
            res.status(200).json(response);
        }
    });
}