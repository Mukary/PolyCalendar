import axios from 'axios'

export function setToken (token) {
  window.localStorage.setItem('pcal_token', token)
}

export function setProfile(id) {
  window.localStorage.setItem('pcal_profile', JSON.stringify({
    _id: id
  }))
}

export function getToken() {
  return window.localStorage.getItem('pcal_token')
}

export function userIsLogged() {
  return window.localStorage.getItem('pcal_token')
}

export function verifyUser() {
    axios.get(`http://localhost:8080/verify`, {
      headers: {'Authorization': `Bearer ${window.localStorage.getItem('pcal_token')}`}
    }, function(err, res){
      if(err){
        console.log("ERR")
        return false
      } 
      else {
        console.log("RES")
        return true
      }
    })
}

export function login(email, password) {
  return new Promise((resolve, reject) => {
    axios.post('http://localhost:8080/login', {
      email: email,
      password: password
    }).then(res => {
      axios.defaults.headers.common['authorization'] = `Bearer ${getToken()}`
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function invite(email) {
    return new Promise((resolve, reject) => {
      axios.post('http://localhost:8080/invite', {
        email: email
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
}