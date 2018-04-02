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

export function getUserViews() {
  return new Promise((resolve, reject) => {
    axios.get(`http://localhost:8080/views`).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function addViewDistant(view) {
  return new Promise((resolve,reject) => {
    axios.post(`http://localhost:8080/views`, view, {
      headers: {'Authorization': `Bearer ${window.localStorage.getItem('pcal_token')}`}
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function deleteViewDistant(viewId) {
  return new Promise((resolve, reject) => {
    axios.delete(`http://localhost:8080/views/${viewId}`, {
      headers: {'Authorization': `Bearer ${window.localStorage.getItem('pcal_token')}`}
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}