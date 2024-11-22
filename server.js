const express = require('express');
const bodyParser = require('body-parser');
const mailgun = require('mailgun-js');
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const mg = mailgun({ apiKey: '152b1c7a456de042be30cef4c5f74eac-6df690bb-656b3a61', domain:'sandbox70ae8e63560f4d61b0a798c4fe024cef.mailgun.org' });

app.post('/subscribe', (req, res) => {
    const email = req.body.email;

    const data = {
        from: 'Abhay  <no-reply@yourdomain.com>',
        to: email,
        subject: 'Welcome to Our Newsletter!',
        text: 'Thank you for subscribing to our newsletter. We are glad to have you with us!',
    };

    mg.messages().send(data, (error, body) => {
        if (error) {
            return res.status(500).send(error.message);
        }
        res.status(200).send('Subscription successful, welcome email sent!');
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
