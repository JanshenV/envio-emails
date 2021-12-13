const yup = require('../validacoes/yup');

const schemaNewsletterbot = yup.object().shape({
    text: yup.string().required(),
    subject: yup.string().max(100)
});

module.exports = schemaNewsletterbot;