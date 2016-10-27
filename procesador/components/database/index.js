var db = require('mysql-promise')();

db.configure({
    "host": "db4free.net",
    "user": "proyectoucu",
    "password": "proyectoucu2015",
    "database": "proyectoucu"
});

/*
db.configure({
    "host": "localhost",
    "user": "root",
    "password": "root",
    "database": "ProyectoUCU"
});*/

module.exports = db;