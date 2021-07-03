  
const express = require('express')
const router = express.Router()
const MoradaController = require('./controllers/MoradaController')

// Lucas: Testing Ping, se retornar Pong True, quer dizer que a aplicação está rodando ok
router.get('/api/ping', MoradaController.ping)

router.post('/api/newasset', MoradaController.AssetAdd)

router.get('/api/pdf', MoradaController.AssetPdf)


module.exports = router