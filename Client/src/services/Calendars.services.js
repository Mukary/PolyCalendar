import axios from 'axios'

export function getUserCalendars() {
  return new Promise((resolve, reject) => {
    axios.get(`${process.env.REACT_APP_API_URL}/calendars`,{
      headers: {'Authorization': `Bearer ${window.localStorage.getItem('pcal_token')}`}
    }).then(res =>{
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function getUserCalendar(calId) {
  return new Promise((resolve, reject) => {
    axios.get(`${process.env.REACT_APP_API_URL}/calendars/${calId}`, {
      headers: {'Authorization': `Bearer ${window.localStorage.getItem('pcal_token')}`}
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function createCalendarDistant(calendar) {
  return new Promise((resolve, reject) => {
    axios.post(`${process.env.REACT_APP_API_URL}/calendars`, calendar, {
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
    axios.delete(`${process.env.REACT_APP_API_URL}/calendars/${calId}`, {
      headers: {'Authorization': `Bearer ${window.localStorage.getItem('pcal_token')}`}
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

