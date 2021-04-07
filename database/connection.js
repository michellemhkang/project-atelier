const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'questions_answers'
})

connection.connect((error) => {
    if (error) {
        console.log('Error connecting to the database', error);
    } else {
        console.log('Successfully connected to database');
    }
})

module.exports = connection;