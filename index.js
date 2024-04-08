const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const port = 4000;

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})

app.post('/', (req, res) => {
    const { name, email, contact, subject, message } = req.body;

    // Create transporter
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'lemueljohnperez0@gmail.com', // Your email address
            pass: 'fryy hvfh drxq adxm' // Your email password
        }
    });

    // Mail options
    let mailOptions = {
        from: {email},
        to: 'lemueljohnperez0@gmail.com', // Your email address
        subject: `Message from ${email}: ${subject}`,
        html: `
            <p>Name: ${name}</p>
            <p>Contact No.: ${contact}</p>
            <p>Message: ${message}</p>`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email');
        }
        
        else {
            console.log('Email sent: ' + info.response);
            res.send('Email sent successfully');
        }
    });
});

// Server Gateway Response
if(require.main === module)
{
    app.listen(process.env.PORT || port, () =>
        {
            console.log(`API is now online on ${process.env.PORT || port}`)
        });
}