require('dotenv').config()
const axios = require('axios')
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const JefNode = require('json-easy-filter').JefNode;
const mongoose = require('mongoose')
const Assets = require('../models/testeModel')
const PDFKit = require('pdfkit');
const fs = require('fs');
require('dotenv').config()
var Banner = require('../controllers/moradaBanner.png');



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
    AssetAdd: (req, res) => {
        const newAsset = req.body
        console.log(newAsset)

        const newData = new Assets({ 
          id: 1,
          name: 'Residencial Luna',
          values: [{
          sinal: 10.801,
          div_entrada: 1.350,
          dta_assinatura: '2014-01-01',
          vlr_itbi: 6.480,
          vlr_registro: 3.441,
          div_itbi: 180,
          div_registro: 96,
          promo_itbi: false,
          promo_registro: false,
          renda: 12.000
        }]
      });
        newData.save(function (err, newData) {
            if (err) return console.error(err);            
          });
          res.json(newAsset)
    },
    AssetPdf: (req, res) => {
      run().catch(err => console.log(err));
      async function run() {

        const data = await Assets.find({ id: 1 });
        console.log(data)
        
        pdf.image('../moradaBanner.png', 12, 15, {width: 620})

        pdf.text('Juntamos aqui algumas informações importantes sobre sua aquisição!', 110, 280)

        pdf
        .fontSize(8)
        .text('Sabemos o quanto a compra de um imóvel gera animação e muita ansiedade. Para você se preparar para as próximas etapas e poder esperar o tão sonhado dia da mudança, com tranquilidade, vamos antecipar algumas informações:', 110, 300)
        
        pdf.image('../seta.png', 110, 335, {width: 20, height: 400})

        pdf.text('Assinatura do contrato', 30, 350)
        pdf
        .fillColor('#545ca4')
        .text(`Com a construtora ${data[0].name}`, 30, 360)

        pdf.moveTo(30, 410)
        .lineTo(100, 410)    
        .stroke("grey")

        pdf.pipe(fs.createWriteStream('output.pdf'));        
        pdf.end();
    }
}
}
