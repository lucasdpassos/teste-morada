  
const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const path = require('path')
const fs = require('fs')
var publicDir = require('path').join(__dirname,'/public'); 


require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(publicDir));
app.use(routes)

// Lucas: Como o Heroku utiliza a variável de ambiente PORT no .env para o seu próprio server, eu optei por deixar a aplicação escolher entre a porta do heroku e a porta do desafio (4321) caso seja testado localmente.

app.listen(process.env.PORT || 4321, () => {
    console.log(`PDF da Morada online em: http://localhost:${process.env.PORT}`)
})




module.exports = app