  
const express = require('express')
const router = express.Router()
const MoradaController = require('./controllers/MoradaController')

// Lucas: Testing Ping, se retornar Pong True, quer dizer que a aplicação está rodando ok
router.get('/api/ping', MoradaController.ping)

router.post('/api/newcat', MoradaController.kittyAdd)


module.exports = router