// crie o codigo para uma conexao com o banco mysql2
// exporte a conexao

const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'todo_list',
});

module.exports = connection;
