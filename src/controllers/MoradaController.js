require('dotenv').config()
const axios = require('axios')
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const JefNode = require('json-easy-filter').JefNode;
const mongoose = require('mongoose')
const Assets = require('../models/Asset')
const PDFKit = require('pdfkit');
const fs = require('fs');
require('dotenv').config()
const sharp = require('sharp');
const path = require('path')
const crypto = require('crypto')

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

        const newData = new Assets(newAsset)

        newData.save(function (err, newData) {
            if (err) return console.error(err);            
          });
          res.json(newData)
    },
    AllAssets: (req, res) => {
      Assets.find(function (err, assets) {
        if (err) return console.error(err);
        res.json(assets);
      })
    },
    AssetPdf: (req, res) => {
      run().catch(err => console.log(err));
      async function run() {

        const item = req.params
        console.log(item)
        const data = await Assets.find({ _id: item.id });
        console.log(data)
        
        
        pdf.image(path.join(__dirname, `../assets/morada.jpeg`), 0, 15, {width: 600})

        pdf
        .fillColor('azure')
        .fontSize(22)
        .text(`${data[0].name}`, 13, 50)

        pdf
        .fillColor('black')
        .fontSize(11)
        .text('Juntamos aqui algumas informações importantes sobre sua aquisição!', 110, 280)

        
        pdf
        .fontSize(8)
        .text('Sabemos o quanto a compra de um imóvel gera animação e muita ansiedade. Para você se preparar para as próximas etapas e poder esperar o tão sonhado dia da mudança, com tranquilidade, vamos antecipar algumas informações:', 110, 300)
        
        pdf.image(path.join(__dirname, `../assets/seta.png`), 110, 335, {width: 20, height: 400})

        pdf.text('Assinatura do contrato', 30, 350)
        pdf
        .fillColor('#545ca4')
        .text(`Com a construtora`, 30, 360)

        pdf.moveTo(30, 410)
        .lineTo(100, 410)    
        .stroke("grey")

        pdf
        .fillColor('black')
        .fontSize(9)
        .text(`Sinal`, 140, 360)

        pdf
        .fillColor('#545ca4')
        .fontSize(10)
        .text(`R$ ${data[0].values[0].sinal}`, 290, 360)

        pdf
        .fillColor('black')
        .fontSize(9)
        .text(`Restante da Entrada`, 140, 390)

        
        pdf
        .fillColor('#545ca4')
        .fontSize(10)
        .text(`R$ ${data[0].values[0].div_entrada * 59}`, 290, 390)


        pdf
        .fillColor('black')
        .fontSize(10)
        .text(`60x de R$ ${data[0].values[0].div_entrada}`, 390, 390)
        
        pdf.moveTo(165, 410)
        .lineTo(340, 410)    
        .stroke("grey")

        pdf
        .fillColor('black')
        .fontSize(8)
        .text('Assinatura do contrato', 30, 430)

        pdf
        .fillColor('#545ca4')
        .text(`Com o Banco`, 30, 440)

        pdf.moveTo(30, 550)
        .lineTo(100, 550)    
        .stroke("grey")

        pdf
        .fillColor('black')
        .fontSize(9)
        .text(`INCC`, 140, 440)

        pdf
        .fillColor('#545ca4')
        .fontSize(10)
        .text(`R$ 0.000`, 290, 440)

        pdf
        .fillColor('black')
        .fontSize(9)
        .text(`Taxa do Banco`, 140, 460)

        pdf
        .fillColor('#545ca4')
        .fontSize(10)
        .text(`R$ 0.000`, 290, 460)

        pdf
        .fillColor('black')
        .fontSize(9)
        .text(`ITBI`, 140, 480)


        // Lucas: A condição abaixo vai determinar alguns desings do PDF baseados na condição booleana da promo_itbi

        if(data[0].values[0].promo_itbi == true) {
          pdf
          .fillColor('#5A6B6A')
          .fontSize(10)
          .text(`R$ ${data[0].values[0].vlr_itbi}`, 290, 480)

          pdf.moveTo(290, 485)
          .lineTo(340, 485)    
          .stroke("red")

          pdf
          .fillColor('#545ca4')
          .fontSize(9)
          .text(`GRATIS`, 390, 480)
        } else {
          pdf
          .fillColor('#545ca4')
          .fontSize(10)
          .text(`R$ ${data[0].values[0].vlr_itbi}`, 290, 480)          
        }
        
        pdf
        .fillColor('#545ca4')
        .fontSize(10)
        .text(`R$ ${data[0].values[0].vlr_itbi}`, 290, 480)

        pdf
        .fillColor('black')
        .fontSize(9)
        .text(`Registro`, 140, 510)

        pdf
        .fillColor('#545ca4')
        .fontSize(10)
        .text(`R$ ${data[0].values[0].vlr_registro}`, 290, 510)

        pdf
        .fillColor('black')
        .fontSize(10)
        .text(`48x de R$ ${data[0].values[0].div_registro}`, 390, 510)

        pdf
        .fillColor('black')
        .fontSize(8)
        .text('Durante as obras', 30, 580)

        pdf
        .fillColor('black')
        .fontSize(9)
        .text(`Evolução de Obra`, 140, 580)
        
        pdf
        .fillColor('#545ca4')
        .fontSize(10)
        .text(`R$ 0.000`, 290, 580)

        pdf.image(path.join(__dirname, `../assets/obrasUp.png`), 355, 565, {width: 30, height: 30})

        pdf
        .fillColor('#545ca4')
        .fontSize(10)
        .text(`R$ 0.000`, 390, 580)

        pdf.moveTo(30, 610)
        .lineTo(100, 610)    
        .stroke("grey")

        pdf
        .fillColor('black')
        .fontSize(8)
        .text('Fim das Obras', 30, 640)

        pdf.moveTo(30, 680)
        .lineTo(100, 680)    
        .stroke("grey")

        pdf
        .fillColor('black')
        .fontSize(9)
        .text(`Financiamento Caixa`, 140, 640)

        pdf
        .fillColor('#545ca4')
        .fontSize(10)
        .text(`R$ 0.000`, 290, 640)

        pdf
        .fillColor('black')
        .fontSize(10)
        .text(`Parcelas de R$ 0.000`, 390, 640)

        pdf
        .fillColor('black')
        .fontSize(8)
        .text('Entrega das Chaves', 30, 710)

        pdf
        .fillColor('black')
        .fontSize(9)
        .text(`Taxa de condomnío`, 140, 690)

        pdf
        .fillColor('#545ca4')
        .fontSize(10)
        .text(`R$ 0.000`, 290, 690)

        pdf
        .fillColor('black')
        .fontSize(9)
        .text(`IPTU`, 140, 706)

        pdf
        .fillColor('#545ca4')
        .fontSize(10)
        .text(`R$ 0.000`, 290, 706)

        var hash = crypto.randomBytes(20).toString('hex');

        pdf.pipe(fs.createWriteStream(`${hash}.pdf`));        
        pdf.end();
    }
}
}
