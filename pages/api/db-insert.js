import { do_query } from './lib/db';

export default async function handler(req, res) {
    try {
        const responses = req.body;
        const values = responses.map(response => [
            response.image_name,
            response.category,
            response.selection
        ]);

        const each_value = values.map((_, index) => `($${index * 3 + 1}, $${index * 3 + 2}, $${index * 3 + 3})`).join(',');
        const sql = `INSERT INTO survey_responses (image_name, category, selection) VALUES ${each_value}`;
        await do_query(sql, values.flat());
        res.status(200).json({ message: 'Data inserted successfully' });
    } catch (error) {
        console.error('Error inserting survey responses into the database:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}