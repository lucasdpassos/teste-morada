  
const express = require('express')
const cors = require('cors')
const routes = require('./routes')


require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())

app.use(routes)

app.listen(process.env.PORT || 4321, () => {
    console.log(`PDF da Morada online em: http://localhost:${process.env.PORT}`)
})




module.exports = app