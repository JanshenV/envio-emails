const yup = require('../validacoes/yup');

const schemaWishlist = yup.object().shape({
    nome: yup.string().required(),
    email: yup.string().email().required()
});

module.exports = schemaWishlist;