import axios from 'axios'

export function register (payloadIn) {
  return new Promise((resolve, reject) => {
    axios.post('http://localhost:8080/register', payloadIn).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}