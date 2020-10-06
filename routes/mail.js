const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/VerifyToken');
const nodemailer = require("nodemailer");

router.post('/', verifyToken, async (req, res) => {
    try {
        let testAccount = await nodemailer.createTestAccount();
        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass, // generated ethereal password
            },
        });
        let info = await transporter.sendMail({
            from: '"😈" <foo@example.com>', // sender address
            to: req.body.email, // list of receivers
            subject: req.body.subject, // Subject line
            text: req.body.text, // plain text body
            html: `<b>${req.body.text}</b>`, // html body
        });
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        res.status(200).send({ message: "E-Mail Sent!", url: nodemailer.getTestMessageUrl(info) })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Failed 😥" })
    }
});

module.exports = router;