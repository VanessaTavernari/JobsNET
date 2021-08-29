const express = require('express')
var cors = require('cors')
const { MongoClient } = require('mongodb');

const app = express()
app.use(express.json())
app.use(cors())

const uri = "mongodb+srv://dbUser:projetojobsnetvtt@cluster0.lflbf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

function checkAndResponseByField(field, res, errorMessage) { 

    if(!field || field == ""){ 
        res.status(400).send(errorMessage)
        return false
    }

    return true
}

function validateFields(body, res) { 

    return checkAndResponseByField(body.cpf, res, "CPF não pode estar vazio") 
        && checkAndResponseByField(body.nome, res, "Nome não pode estar vazio")
        && checkAndResponseByField(body.profissao, res, "Profissao não pode estar vazio")
        && checkAndResponseByField(body.dataDeNascimento, res, "Data de nascimento não pode estar vazio")
        && checkAndResponseByField(body.endereco, res, "Endereço não pode estar vazio")
        && checkAndResponseByField(body.cidade, res, "Cidade não pode estar vazio")
        && checkAndResponseByField(body.cep, res, "CEP não pode estar vazio")
        && checkAndResponseByField(body.celular, res, "Celular não pode estar vazio")
        && checkAndResponseByField(body.email, res, "Email não pode estar vazio")
        && checkAndResponseByField(body.confirmacao, res, "Deve confirmar as informações antes de finalizar")
}
  
app.post('/candidato', function (req, res) {
    console.log(req.body)
    let user = req.body
    
    if (validateFields(req.body, res) == false) { return }

    client.connect(err => {
        user._id = user.cpf
        const collection = client.db("FormularioDeInscricao").collection("Candidatos");
        collection.insertOne(user).then((result) => { 
            res.json(result)
        }).catch((error) => {
            res.status(400).send("Error ao cadastrar, verifique se o usuário do cpf "+user.cpf+" já existe");
        }).finally(() => { 
            client.close()
        })

    });
})

app.get('/candidato/:cpf', function (req, res) {
    
    client.connect(err => {

        const collection = client.db("FormularioDeInscricao").collection("Candidatos");
        collection.findOne({cpf:req.params.cpf}, function(err, item) {

            console.log(item)
            if (!item) {

                res.status(404).json({})

            } else {

                res.json(item)
            }

            client.close();
        })

    });
})
 
app.listen(3000)