require('dotenv').config()
const axios = require('axios')
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const JefNode = require('json-easy-filter').JefNode;

 

module.exports = {
    ping: (req, res) => {
        res.json({pong:true})
    },
}
