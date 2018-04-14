import axios from 'axios'

export function getUserCalendars() {
  return new Promise((resolve, reject) => {
    axios.get(`http://localhost:8080/calendars`,{
      headers: {'Authorization': `Bearer ${window.localStorage.getItem('pcal_token')}`}
    }).then(res =>{
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function createCalendarDistant(calendar) {
  return new Promise((resolve, reject) => {
    axios.post(`http://localhost:8080/calendars`, calendar, {
      headers: {'Authorization': `Bearer ${window.localStorage.getItem('pcal_token')}`}
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function deleteCalendarDistant(calId) {
  return new Promise((resolve, reject) => {
    axios.delete(`http://localhost:8080/calendars/${calId}`, {
      headers: {'Authorization': `Bearer ${window.localStorage.getItem('pcal_token')}`}
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

