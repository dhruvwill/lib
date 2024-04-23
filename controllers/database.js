const { render } = require('ejs');
const { db } = require('../models/db.js');

const connect = (req, res) => {
    db.connect((err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Connected to database");
        }
    });
}

const query = (req, res) => {
    db.query(req.body.query, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(result);
        }
    });
}

module.exports = {
    connect,
    query
}

