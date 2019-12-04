function knex_config() {
    let knex = require('knex')({
        client: 'mssql',
        connection: {
            host: 'localhost',
            user: 'lucasUm',
            password: '987654321',
            database: 'dbLucca',
            port: 1412
        }
    });
}
module.exports = knex_config