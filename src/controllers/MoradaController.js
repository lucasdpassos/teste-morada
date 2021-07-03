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
        
        pdf  
  .fontSize(13)
  .fillColor('#6155a4')
  .text(`Texto formatado ${data[0].name}`, {
    align: 'center'
  })

        pdf.pipe(fs.createWriteStream('output.pdf'));
        pdf.end();
    }
}
}
