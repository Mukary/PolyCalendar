const bcrypt = require('bcrypt')
const encrypt = {}

encrypt.hashPassword = (plainPassword) => {
  bcrypt.hash(plainPassword, 10, function(err, hash){
    return hash
  })
}

module.exports = encrypt