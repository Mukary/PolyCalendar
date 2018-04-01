const router = require('express').Router()
const inviteController = require('../../controllers/inviteController')
const middleware = require('../../middleware')
const mongoose = require('mongoose')
const nodemailer = require('nodemailer')

module.exports = (router, controller) => {

  router.post('/register', function(req, res, err) {
  console.log(req.body)
  let user = req.body
  controller.create(user).then( () => {
    return res.status(201).send('User successfully registered.')
  }).catch(err => {
    console.log(err)
    return res.status(400).send('Bad request')
  })
})

router.post('/login', function(req, res, err) {
  let userConnecting = req.body
  controller.login(userConnecting).then(user => {
    return res.status(201).json(user)
  }).catch(err => {
    return res.status(err.status).send(err.message)
  })
})

router.post('/invite', function(req, res, err) {
  let email = req.body.email
  inviteController.create(email).then(invite => {
    console.log(invite)
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
    nodemailer.createTestAccount((err, account) => {
// create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail', // true for 465, false for other ports
        auth: {
          user: 'polytechcalendar@gmail.com', // generated ethereal user
          pass: 'awiproject34' // generated ethereal password
    }
});

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"PolyCalendar" <kq5qtgcuyjaczma6@ethereal.email>', // sender address
    to: `${invite.email}`, // list of receivers
    subject: 'Overwatch', // Subject line
    text: `http://localhost:3000/register?email=${invite.email}&code=${invite.code}`, // plain text body
  };

  // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      });
    });
    res.status(201).send(`Invitation link sent at ${invite.email}`)
  }).catch(err => {
    console.log(err)
    res.status(403).send(`User ${res.email} already exists, please use another email`)
  })
})

router.get('/users/:userId', middleware.ensureToken ,function(req, res, err){
  if(req.data._id === req.params.userId) {
    controller.findById(req.params.userId).then(user => {
      res.status(200).send({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        accountCreation: user.accountCreation
      })
    }).catch(err => {
      res.status(404).send('User not found')
    })
  } else res.status(403).send('Unauthorized')
})

}