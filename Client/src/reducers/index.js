import addViewDistant from '../services/User.services'

const initialState = {
  calendars: ["MON","TUE","WED", "THU", "FRI"],
  views: [],
  userProfile: {
    firstname: '',
    lastname: '',
    email: '',
    accountCreation:''
  }
}

export default function (state = initialState, action) {
  console.log(action)
  switch(action.type) {
    case "ADD_DAY":
      const newCalendars = state.calendars.slice()
      newCalendars.push(action.payload)
      return {
        ...state,
        calendars: newCalendars
      }
    case "FETCH_USER_PROFILE":
      return {
        ...state,
        userProfile: action.payload
      }
    case "FETCH_VIEWS":
      return {
        ...state,
        views: action.payload
      }
    case "ADD_VIEW":
      const newViews = state.views.slice()
      newViews.push(action.payload)
      return {
        ...state,
        views: newViews
      }
    default:
      return initialState
  }
}