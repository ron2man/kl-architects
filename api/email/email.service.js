const nodemailer = require('nodemailer');

const emailAddress = 'ron2man10@gmail.com'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: emailAddress,
      pass: 'ron9565239' // naturally, replace both with your real credentials or an application-specific password
    }
  });
  




async function startEmail(email, name, msg) {
    const mailOptions = {
        from: 'lala@gmail.com',
        // from: email,
        to: emailAddress,
        subject: 'Lets start a new project',
        text: `${name} => ${msg}`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          return Promise.reject(error)
        } else {
          console.log('Email sent: ' + info.response);
          return Promise.resolve('success')
        }
      });
}


module.exports = {
    startEmail
}

