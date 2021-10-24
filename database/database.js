const Sequelize = require("sequelize");

const connection = new Sequelize('guiaperguntas', 'root', 'fa2544', {
    host: 'localhost', // seervidor que esta rodando
    dialect: 'mysql'
}) // nome , usuario , senha 

module.exports = connection; // exportando para utilizar e outros arquivos 