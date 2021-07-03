const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
    id: Number,
    name: String,
    values: [{
    sinal: Number,
    div_entrada: Number,
    dta_assinatura: Date,
    vlr_itbi: Number,
    vlr_registro: Number,
    div_itbi: Number,
    div_registro: Number,
    promo_itbi: Boolean,
    promo_registro: Boolean,
    renda: Number
     }]

  });


module.exports = mongoose.model('Assets', assetSchema)