require('dotenv').config();
const nodemailer = require("nodemailer");


const sendForgotPasswordEmail = async (adress, url) => {
    const subject = "Mot de passe oublié";
    const baliseUrl = '<a href="' + url + '">' + url + '</a>';
    const body = "<h3>Avez-vous oublié votre mot de passe ?</h3>" +
        "<p> Pas d'inquiétude, ça arrive ! <br/> Suivez ce lien dans les deux heures pour renseigner un nouveau mot de passe</p>" +
        baliseUrl +
        "<p> Vous n'êtes pas à l'origine de cette demande ? Pas d'inquiétude, personne ne pourra modifier votre compte sans ce lien. </p>";
    sendMyMail(adress, subject, body)
}


const sendPasswordChangedEmail = async (adress) => {
    const subject = "Votre mot de passe a été modifié";
    const body = "<h3>Vous avez modifié votre mot de passe.</h3>" +
        "<p>Nous vous confirmons que votre mot de passe a été modifié, suivant le lien envoyé précédemment par mail. <br/><br/>Une question ? Contactez nous par réponse à ce mail ou dans un nouveau mail à occeco.assistance@gmail.com</p>";
    sendMyMail(adress, subject, body)
}


const sendMyMail = async (adress, subject, body) => {
    // create the Gmail transporter
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "occeco.assistance@gmail.com",
            pass: process.env.PASSWORD_EMAIL,
        },
    });

    // send mail with defined transport object
    let mailOptions = {
        from: '"OCCECO support" <occeco.assistance@gmail.com>',
        to: adress, // list of receivers
        subject: subject, // Subject line
        html: body,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log("erreur lors de l'envoi de mail : ", error);
        }
        console.log('Message sent: ' + info.response);
    });

}

module.exports = {
    sendForgotPasswordEmail,
    sendPasswordChangedEmail,
}