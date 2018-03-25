const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const middleware = require('./middleware')
const jwt = require('jsonwebtoken')
const app = express()
const register = require('./routes/User/index')
require('dotenv').config()

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, authorization, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers')
 
 //and remove cacheing so we get the most recent comments
  res.setHeader('Cache-Control', 'no-cache')
  next()
 })

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


app.use('/', require('./routes'))

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/protected', ensureToken, function(req, res){
  jwt.verify(req.token, process.env.SECRET_KEY, function(err, data){
    if(err)
      res.sendStatus(403)
    else res.status(200).json({
      msg: 'protected route',
      data: data
    })
  })
})

function ensureToken (req, res, next) {
  const bearerHeader = req.headers["authorization"]
  console.log(bearerHeader)
  if(typeof bearerHeader !== 'undefined'){
    const bearer = bearerHeader.split(' ')
    const bearerToken = bearer[1]
    req.token = bearerToken
    next()
  } else res.status(403).send('Forbidden') 
}

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})

mongoose.connect(process.env.DB_URL)