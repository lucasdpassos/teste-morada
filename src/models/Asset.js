const mongoose = require('mongoose');


/* Lucas: Preferi montar os valores do desafio em um array "valores" dentro do empreendimento, e de fora ficam o nome e o _id, dessa forma fica mais dinâmico, o nome 
do empreendimento fica no topo do PDF */

const assetSchema = new mongoose.Schema({
   
    name: {type: String, required: true},
    values: [{
    sinal: String,
    div_entrada: String,
    dta_assinatura: Date,
    vlr_itbi: String,
    vlr_registro: String,
    div_itbi: String,
    div_registro: String,
    promo_itbi: Boolean,
    promo_registro: Boolean,
    renda: String
     }]

  });


module.exports = mongoose.model('Assets', assetSchema)