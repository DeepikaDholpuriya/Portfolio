const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

app.post('/send', (req, res) => {
    const { name, email, phone, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
            user: 'dholpuriyadeepika@gmail.com', 
            pass: '@deepika_04'
        }
    });

    const mailOptions = {
        from: email,
        to: 'dholpuriyadeepika@gmail.com',
        subject: `New Contact Form Submission: ${subject}`,
        text: `You have received a new message from your contact form.\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send({ success: false, message: 'Failed to send message' });
        } else {
            console.log('Email sent: ' + info.response);
            res.send({ success: true, message: 'Message sent successfully' });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
