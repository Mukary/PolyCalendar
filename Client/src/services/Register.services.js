import axios from 'axios'

export default function register (payloadIn) {
  axios.post('http://localhost:8080/register', payloadIn).then(res => {
    console.log(res)
  })
}