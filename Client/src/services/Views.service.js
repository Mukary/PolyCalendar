import axios from 'axios'

export function getViews() {
  return new Promise((resolve, reject) => {
    axios.get(`${process.env.REACT_APP_API_URL}/views`,{
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