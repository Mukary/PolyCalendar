const jwt = require('jsonwebtoken')
const middleware = {}

middleware.ensureToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization']
  if(typeof bearerHeader !== undefined){
    const bearer = bearerHeader.split(' ')
    const bearerToken = bearer[1]
    req.token = bearerToken
    jwt.verify(req.token, process.env.SECRET_KEY, function(err, data){
      if(err){
        console.log(err)
        res.status(401).send('Malformed token')
      }
      else {
        req.data = data
        next()
      }
    })
  } else {
    res.status(401).send('Forbidden: no token provided') 
  }
}

middleware.checkUserParam = (req, res, next) => {
  if(req.params.userid == null || req.params.userid == undefined) res.status(400).send('Missing user id param')
  else next()
}

module.exports = middleware