// Os numeros comentados no codigo, é apenas um guia de comentario no final da pagina.

const express = require("express");
const app = express();
const bodyParser = require("body-Parser");
const connection = require("./database/database");
const Pergunta = require("./database/Perguntas"); // Modeel esta representando a tabela no javascript
const Resposta = require("./database/resposta");

connection
    .authenticate()
    .then(() => {
        console.log("Coneção feita com banco de dados!")
    })

    .catch((msgErro) => {
        console.log(msgErro) //( 4 )

    })

app.set('view engine', 'ejs'); //( 1 )
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false })); //( 2 )
app.use(bodyParser.json()); // ( 3 )

//rotas
app.get("/", (req, res) => {
    Pergunta.findAll({
        raw: true, order: [// ASC= crescente .. DESC=decrecente, para ordenar as perguntas metodo de ordenar 
            ['id', 'DESC']
        ]
    }).then(perguntas => {// este metodo é responsavel por procurar todas  as pergunta da tabela e retornar para gente, raw quer dizer pesquisa cru, so traze os dados 
        res.render("index", {
            perguntas: perguntas // assim  mando as perguntas para o frontend.
        });
    });
    // res.render("index"); para passar as pergntas para pagina principal mandamos este, para o then acima.
});


// select = All from perguntas no sql


app.get("/perguntar", (req, res) => {
    res.render("perguntar");
})

app.post("/salvarpergunta", (req, res) => {

    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    res.send("formulario recebido com sucesso! titulo  " + titulo + "  " + " descricao " + descricao);

    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/");
    });
});

app.get("/pergunta/:id", (req, res) => {
    var id = req.params.id;
    Pergunta.findOne({
        where: { id: id }  //where serve para fazer condições 
    }).then(pergunta => { //
        if (pergunta != undefined){       //pergunta encontrada
           
            Resposta.findAll({
               where: {perguntaId: pergunta.id},
               order:[
                   ['id' ,'DESC'] 
                ]
           }).then(respostas => {
               res.render("pergunta", {
                  pergunta: pergunta,
                  respostas: respostas
               });
           });
     }
      else {           //nao encontrada
            res.redirect("/");
        }
    });

})

app.post("/responder", (req, res) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/" + perguntaId);
    });
});



app.listen(8000, () => { console.log("App rodando!"); });

// ( 1 ) Estou dizendo para o Express usar o EJS como  View engine.
// ( 2 )  (rotas ) O comando (express)vai permitir que a pessoa envie os dados de formulario e express parer vai traduzir em uma estrutura javascript ele renderiza. 
// ( 3 ) Será utizado quando estiver trabalhando com API
// ( 4 ) esta estrturura chamasse promesse do javascrip