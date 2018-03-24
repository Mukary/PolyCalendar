const express = require('express')
const User = require('../../models/User')
const router = express.Router();


// define the home page route
router.get('/', function(req, res) {
  res.send('Register home page');
});

router.post('/', function(req, res, err) {
  console.log('Received data: '+req.body.firstname)
  let user = new User(req.body)
  user.save(function(err){
    if(err){
      console.log(err)
      res.status(400).send('Uncomplete information')
    } else {
      res.status(200).send('User successfully registered')
    }
  })
});

module.exports = router;