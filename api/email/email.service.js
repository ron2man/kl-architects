const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'keren.architects@gmail.com',
      pass: 'Qd4<p+P>' // naturally, replace both with your real credentials or an application-specific password
    }
  });
  
async function startEmail(email, name, msg) {
    const mailOptions = {
        from: `website lead <keren.architects@gmail.com>`,
        to: 'keren.architects@gmail.com',
        subject: 'Lets start a new project',
        html: `sender email: ${email}<br><br> sender name: ${name}<br><br> msg: ${msg}`,
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

