const pgp = require('pg-promise')({
    query: e => {
        console.log('QUERY: ', e.query);
    }
});

const options = {
    host: 'localhost',
    database: 'spraylog',
    user: 'postgres',
    password: 'Fiddle123'
};
const db = pgp(options);
module.exports = db;