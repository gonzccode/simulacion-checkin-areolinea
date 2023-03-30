const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: 'mdb-test.c6vunyturrl6.us-west-1.rds.amazonaws.com',
    user: 'bsale_test',
    password: 'bsale_test',
    database: 'airline',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})


module.exports = pool;


