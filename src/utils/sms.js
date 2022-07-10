const accountSid = "ACb3b955972acc10d26c007c181f78baec";
const authToken = "126f52f190deb5b432fb5dbe5d28deb7";
const client = require("twilio")(accountSid, authToken);

const sendSMS = (phoneNumber, text) => {
    client.messages
        .create({
            body: text,
            messagingServiceSid: "MGa47e2b356fb67e7e6ec6a7384a77cf7d",
            to: phoneNumber,
        })
        .then((message) => console.log(message.sid))
        .done();
};

module.exports = sendSMS