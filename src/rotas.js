const express = require('express');
const rotas = express();
const {
    Wishlist,
    NewsletterBot
} = require('./Wishlist');

rotas.post('/addtonewsletter', Wishlist);
rotas.post('/sendingnewsletter', NewsletterBot);

module.exports = rotas;