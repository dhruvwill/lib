const mysql = require('mysql');

let db = mysql.createConnection({
    host: "localhost",
    user: "root",
    port: 3306,
    password: "",
    database: "Lib"
});

module.exports = {db};
