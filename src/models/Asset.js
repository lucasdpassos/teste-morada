const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
    id: {type:Number, required: true},
    name: String,
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