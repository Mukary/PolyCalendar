import axios from 'axios'

export function setToken (token) {
  window.localStorage.setItem('pcal_token', token)
}

export function setProfile(id) {
  window.localStorage.setItem('pcal_profile', JSON.stringify({
    _id: id
  }))
}

export function resetCredentials() {
  window.localStorage.removeItem('pcal_token')
  window.localStorage.removeItem('pcal_profile')
}

export function getToken() {
  return window.localStorage.getItem('pcal_token')
}

export function userIsLogged() {
  return window.localStorage.getItem('pcal_token')
}

export function verifyUser() {
    axios.get(`${process.env.REACT_APP_API_URL}/verify`, {
      headers: {'Authorization': `Bearer ${window.localStorage.getItem('pcal_token')}`}
    }, function(err, res){
      if(err){
        return false
      } 
      else {
        return true
      }
    })
}

export function login(email, password) {
  return new Promise((resolve, reject) => {
    axios.post(`${process.env.REACT_APP_API_URL}/login`, {
      email: email,
      password: password
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function linkGoogleAccount(code) {
  return new Promise((resolve, reject) => {
    axios.post(`${process.env.REACT_APP_API_URL}/oauth`, {
      code: code
    }, {
      headers: {'Authorization': `Bearer ${window.localStorage.getItem('pcal_token')}`}
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export function invite(email) {
    return new Promise((resolve, reject) => {
      axios.post(`${process.env.REACT_APP_API_URL}/invite`, {
        email: email
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
}