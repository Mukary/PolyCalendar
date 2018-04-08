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

export function getView(viewId) {
  return new Promise((resolve, reject) => {
    axios.get(`http://localhost:8080/views/${viewId}`,{
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
    axios.put(`http://localhost:8080/views/${viewId}`, {
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
    axios.post('http://localhost:8080/views', view).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}