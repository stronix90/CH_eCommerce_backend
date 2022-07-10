const nodemailer = require("nodemailer");
const env = require("../config/env");

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
        to: env.ADMIN_EMAIL,
        subject: subject,
        text: text,
        html: text
    });
};

initializeEmail();

module.exports = { sendEmail };
