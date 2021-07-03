require('dotenv').config()
const axios = require('axios')
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const JefNode = require('json-easy-filter').JefNode;
const mongoose = require('mongoose')
const Kitten = require('../models/testeModel')
const PDFKit = require('pdfkit');
const fs = require('fs');
require('dotenv').config()

mongoose.connect(process.env.MONGO_URI);

const pdf = new PDFKit();

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});
 

module.exports = {
    ping: (req, res) => {
        res.json({pong:true})
    },
    kittyAdd: (req, res) => {
        const newKitty = req.body
        console.log(newKitty)

        const silence = new Kitten({ name: newKitty.name });
        silence.save(function (err, silence) {
            if (err) return console.error(err);            
          });
          res.json(newKitty)
    },
    kittyPdf: (req, res) => {
      run().catch(err => console.log(err));
      async function run() {

        const data = await Kitten.find({ name: /^Ca/ });
        
        pdf.image('../primeiroape.png', 0, 15, {width: 620})

        pdf.text('Juntamos aqui algumas informações importantes sobre sua aquisição!', 110, 280)

        pdf
        .fontSize(8)
        .text('Sabemos o quanto a compra de um imóvel gera animação e muita ansiedade. Para você se preparar para as próximas etapas e poder esperar o tão sonhado dia da mudança, com tranquilidade, vamos antecipar algumas informações:', 110, 300)
        
        pdf.image('../seta.png', 110, 15, {width: 20, height: 400})

        pdf.pipe(fs.createWriteStream('output.pdf'));        
        pdf.end();
    }
}
}
