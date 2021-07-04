  
const express = require('express')
const router = express.Router()
const MoradaController = require('./controllers/MoradaController')

// Lucas: Testing Ping, se retornar Pong True, quer dizer que a aplicação está rodando ok
router.get('/api/ping', MoradaController.ping)

// Lucas: Essa rota adiciona um novo empreendimento no mongoDB utilizando as informações do body da requisição
router.post('/api/newasset', MoradaController.AssetAdd)

// Lucas: Essa rota monta o PDF com os valores do empreedimento requisitado pelo _id do mongo, conforme o exemplo na documentação da api
router.get('/pdf/valores/:id', MoradaController.AssetPdf)

// Lucas: Essa rota retorna todos os empreedimentos registrados no banco
router.get('/api/assets', MoradaController.AllAssets)


module.exports = router