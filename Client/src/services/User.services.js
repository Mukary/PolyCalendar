import axios from 'axios'

export function getUserProfile(userId) {
  return new Promise((resolve, reject) => {
    axios.get(`http://localhost:8080/users/${userId}`,{
      headers: {'Authorization': `Bearer ${window.localStorage.getItem('pcal_token')}`}
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}