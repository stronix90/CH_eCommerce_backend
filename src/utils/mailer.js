const config = require("../config/config");

const nodeoutlook = require('nodejs-nodemailer-outlook')

const sendEmail = (to, subject, data) => {
    nodeoutlook.sendEmail({
        auth: {
            user: config.EMAIL_USER,
            pass: config.EMAIL_PASS
        },
        //from: 'Luna Brian',
        to,
        subject,
        html: data,
        //replyTo: 'brian.luna@trenesargentinos.gob.ar',
        onError: (e) => console.log(e),
        onSuccess: (i) => console.log(i)
    });
}

module.exports = sendEmail

















/*

const nodemailer = require("nodemailer");
const config = require("../config/config");

let transporter;

const initializeEmail = async () => {
    // create reusable transporter object using the default SMTP transport
    transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "maybell.moen95@ethereal.email", // generated ethereal user
            pass: "kBsN4sgEVtp1SS63Ch", // generated ethereal password
        },
    });
};

const sendEmail = (subject, text) => {
    transporter.sendMail({
        from: "maybell.moen95@ethereal.email", // sender address
        to: config.ADMIN_EMAIL,
        subject: subject,
        text: text,
        html: text
    });
};

initializeEmail();

module.exports = { sendEmail };
*/