const utils = {}

utils.passwordMatcher = (password) => {
  const toLowerPwd = password.toLowerCase()
  const hasNumber = password.match(/\d+/g)
  return password.length >= 6 && hasNumber !== null && toLowerPwd === password
}

utils.passwordMatcher2 = (password) => {
  let upperCase = 0
  let specialChar = 0
  let digitChar = 0
  for(i=0; i<password.length; i++){
    if (password[i].match(/[A-Z]/g)) upperCase++
    if (password[i].match(/[0-9]/g)) digitChar++
    if (password[i].match(/(.*[!,@,#,$,%,^,&,*,?,_,~])/)) specialChar++
  }
  return (password.length >= 6) && (upperCase > 0) && (specialChar > 0) && (digitChar > 0)
}

module.exports = utils