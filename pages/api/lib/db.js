const { Pool } = require('pg');

const pool = new Pool({
    host: '10.0.10.12',
    port: '5432',
    user: 'postgres',
    password: 'postgres',
    database: 'tfg-jcg'
});

const do_query = (sql, params) => {
    return new Promise((resolve, reject) => {
        pool.query(sql, params, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results.rows);
            }
        });
    });
};

module.exports = {
    do_query
};