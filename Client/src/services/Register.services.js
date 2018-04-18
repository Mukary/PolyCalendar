import axios from 'axios'

export function register (payloadIn) {
  return new Promise((resolve, reject) => {
    axios.post(`${process.env.REACT_APP_API_URL}/register`, payloadIn).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}