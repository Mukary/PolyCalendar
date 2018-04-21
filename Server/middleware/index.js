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
        res.status(403).send('Malformed token')
      }
      else {
        req.data = data
        next()
      }
    })
  } else {
    res.status(403).send('Forbidden: no token provided') 
  }
}

module.exports = middleware