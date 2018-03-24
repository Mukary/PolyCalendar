const express = require('express');
const router = express.Router();


// define the home page route
router.get('/', function(req, res) {
  res.send('Register home page');
});

router.post('/', function(req, res, err) {
  console.log('Received data: '+req.body.firstname)
  res.status(200).send('Firstname received')
});

module.exports = router;