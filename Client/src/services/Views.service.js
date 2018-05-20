import axios from 'axios'
const profile = JSON.parse(window.localStorage.getItem('pcal_profile'))

export function getViews() {
  return new Promise((resolve, reject) => {
    const userid = profile._id
    axios.get(`${process.env.REACT_APP_API_URL}/users/${userid}/views`,{
      headers: {'Authorization': `Bearer ${window.localStorage.getItem('pcal_token')}`}
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export function getView(viewId) {
  return new Promise((resolve, reject) => {
    axios.get(`${process.env.REACT_APP_API_URL}/views/${viewId}`,{
      headers: {'Authorization': `Bearer ${window.localStorage.getItem('pcal_token')}`}
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function getSharedView(viewId) {
  return new Promise((resolve, reject) => {
    axios.get(`${process.env.REACT_APP_API_URL}/views/share/${viewId}`).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function updateViewDistant(viewId, calendars, action){
  return new Promise((resolve, reject) => {
    axios.put(`${process.env.REACT_APP_API_URL}/views/${viewId}`, {
      calendars: calendars,
      action: action
    }, {
      headers: {'Authorization': `Bearer ${window.localStorage.getItem('pcal_token')}`}
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function addView(view){
  return new Promise((resolve, reject) => {
    axios.post(`${process.env.REACT_APP_API_URL}/views`, view).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export function getIcalView(viewId) {
  return new Promise((resolve, reject) => {
    axios.get(`${process.env.REACT_APP_API_URL}/views/${viewId}/export`).then(res =>{
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}