const nodemailer = require('nodemailer')
const smtp = require('nodemailer-smtp-transport')
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path')


const readHTMLFile = function (path, callback) {
  fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
    if (err) {
      throw err;
      callback(err);
    }
    else {
      callback(null, html);
    }
  });
};


// let transporter = nodemailer.createTransport(
//   smtp({
//     host: 'in-v3.mailjet.com',
//     port: 587,
//     auth: {
//       user: process.env.MAILJET_USER,
//       pass: process.env.MAILJET_PASS
//     },
//     tls: {
//       rejectUnauthorized: false
//     }
//   })
// )

let transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  // secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false
  }
});

function sendConfirmationMail(email, firstname, lastname) {

  readHTMLFile(path.join(__dirname, '..', '/views/email.html'), function (err, html) {
    var template = handlebars.compile(html);
    var replacements = {
      name: `${firstname} ${lastname}`
    };
    var htmlToSend = template(replacements)


    let mailTransport = {
      from: '"React Africa" <reactafrica@gmail.com>',
      to: email, // list of receivers
      subject: "Account Activation", // Subject line
      html: htmlToSend
    };

    transporter.sendMail(mailTransport, (error, info) => {
      if (error) console.log(error)
      console.log("mail sent")
    });
  })
}

module.exports = { sendConfirmationMail }