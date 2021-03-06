const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const middleware = require('./middleware')
const jwt = require('jsonwebtoken')
const app = express()
const register = require('./routes/User/index')
require('dotenv').config()

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin','*')
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

const port = process.env.PORT || 8080

app.listen(port, function () {
  console.log('Example app listening on port '+port)
})

mongoose.connect(process.env.DB_URL)