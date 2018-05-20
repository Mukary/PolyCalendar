import axios from 'axios'

export function getUserProfile(userId) {
  return new Promise((resolve, reject) => {
    axios.get(`${process.env.REACT_APP_API_URL}/users/${userId}`,{
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
    let profile = JSON.parse(window.localStorage.getItem('pcal_profile'))
    let userid = profile._id
    axios.get(`${process.env.REACT_APP_API_URL}/users/${userid}/views`,{
      headers: {'Authorization': `Bearer ${window.localStorage.getItem('pcal_token')}`}
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function addViewDistant(view) {
  return new Promise((resolve,reject) => {
    axios.post(`${process.env.REACT_APP_API_URL}/views`, view, {
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
    axios.delete(`${process.env.REACT_APP_API_URL}/views/${viewId}`, {
      headers: {'Authorization': `Bearer ${window.localStorage.getItem('pcal_token')}`}
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}