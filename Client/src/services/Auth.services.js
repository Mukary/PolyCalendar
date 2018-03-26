import axios from 'axios'

export function setToken (token) {
  window.localStorage.setItem('pcal_token', token)
}

export function login(email, password) {
  return new Promise((resolve, reject) => {
    axios.post('http://localhost:8080/login', {
      email: email,
      password: password
    }).then(res => {
      resolve(res.data.token)
    }).catch(err => {
      reject(err)
    })
  })
}