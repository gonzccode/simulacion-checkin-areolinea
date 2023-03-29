const express = require("express");
const mysql = require("mysql2");
const app = express();

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (request, response) => {
    return response.json({
        ok: true,
        message: 'endpoint initial',
        port: PORT
    })
});

// create the connection to database
const connection = mysql.createConnection({
    host: 'mdb-test.c6vunyturrl6.us-west-1.rds.amazonaws.com',
    user: 'bsale_test',
    password: 'bsale_test',
    database: 'airline'
});

connection.query('SELECT * FROM boarding_pass;', function(err, results, fields) {
    console.log('error', err)
    console.log('query', results[0]);
    console.log('fields', fields);
});

connection.end();

app.listen(PORT, () => {
    console.log(`Listen to PORT: ${PORT}`);
});