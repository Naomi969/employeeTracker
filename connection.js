const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'naomitorres',
    database: 'EmployeeTracker',
    multipleStatements: true,
});

connection.connect((err) => {
    if (!err) {
        console.log('yay')
    } else {
        console.log("Connection Failed");
    }
});

module.exports = connection;