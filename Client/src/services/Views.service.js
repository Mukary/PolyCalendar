import axios from 'axios'

export function getViews() {
  return new Promise((resolve, reject) => {
    axios.get(`http://localhost:8080/views`,{
      headers: {'Authorization': `Bearer ${window.localStorage.getItem('pcal_token')}`}
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export function addView(view){
  return new Promise((resolve, reject) => {
    axios.post('http://localhost:8080/views', view).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}