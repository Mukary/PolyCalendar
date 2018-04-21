const utils = {}

utils.passwordMatcher = (password) => {
  const toLowerPwd = password.toLowerCase()
  const hasNumber = password.match(/\d+/g)
  return password >= 6 && hasNumber !== null && toLowerPwd === password
}

module.exports = utils