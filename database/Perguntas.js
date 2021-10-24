
const Sequelize = require("sequelize");
const connection = require("./database");

const Pergunta = connection.define('perguntas', {

    titulo: {
        type: Sequelize.STRING,            // para criar campo nome,tipo , tipo string texto curto e text longo
        allowNull: false                   // impedide  que o campo receba valor   nulo
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    }


});

Pergunta.sync({ force: false }).then(() => { }); //vai sincronizar com banco de dados , o force significa que ele nao vai forçar a criação caso ela exista.

module.exports = Pergunta;