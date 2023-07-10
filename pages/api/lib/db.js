const { Pool } = require('pg');

const pool = new Pool({
    host: '10.0.10.38',
    port: '5432',
    user: 'postgres',
    password: 'postgres',
    database: 'javi'
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