const knex = require('../bancoDeDados/connection');
const nodemailer = require('../nodemailer');
const schemaWishlist = require('../validacoes/schemaWishlist');
const schemaNewsletterbot = require('../validacoes/schemaNewsletterBot');;

async function Wishlist(req, res) {
    const { email, nome } = req.body;

    try {
        await schemaWishlist.validate(req.body);

        const existingUser = await knex('usuarios')
            .where({ email })
            .first();

        if (existingUser) {
            return res.status(400).json({
                message: 'Email is already in use by another user.'
            });
        };

        await knex('usuarios')
            .insert({ email, nome });

        const dataToBeSent = {
            from: 'Newsletter <Do-not-reply@learning-to-deploy-cubos.herokuapp.com',
            to: email,
            subject: 'Subscription to My one and only Newsletter. YEAH!',
            text: `Hello ${nome}. You have just subscribed to my one and only newsletter. You can log in with your email: ${email}`
        };

        nodemailer.sendMail(dataToBeSent);

        return res.status(201).json('User created! Yeah!');
    } catch ({ message }) {
        return res.status(400).json({ message: message });
    };
};

async function NewsletterBot(req, res) {
    const { text, subject } = req.body;

    try {
        await schemaNewsletterbot.validate(req.body);

        const subscribedUsers = await knex('usuarios');

        let dataToBeSent;
        subscribedUsers.forEach(User => {
            dataToBeSent = {
                from: 'Newsletter <Do-not-reply@learning-to-deploy-cubos.herokuapp.com',
                to: User.email,
                subject: subject,
                template: 'newslettertemplate',
                context: {
                    text,
                    subject,
                    email: User.email
                }
            };
            nodemailer.sendMail(dataToBeSent);
        });

        return res.status(200).json('YEAH');
    } catch ({ message }) {
        return res.status(400).json({ message: message });

    };
};


module.exports = {
    Wishlist,
    NewsletterBot
};