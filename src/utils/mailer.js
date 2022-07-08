const nodemailer = require("nodemailer");

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

const sendEmail = (email) => {
    transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: email,
        subject: "Nuevo usuario ✔",
        text: "Se ha registrado un nuevo usuario", // plain text body
        html: "<h1>Nuevo usuario</h1> <p>Se ha registrado un nuevo usuario</p> ", // html body
    });
};

initializeEmail();

module.exports = { sendEmail };
