const initialState = {
  calendars: [],
  views: [],
  userProfile: {
    firstname: '',
    lastname: '',
    email: '',
    accountCreation:''
  },
  currentView: {
    calendars: []
  },
  currentCalendar: {
    events: []
  }
}

export default function (state = initialState, action) {
  switch(action.type) {
    case "ADD_DAY":
      let newCalendars = state.calendars.slice()
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
    case "FETCH_CURRENT_VIEW":
      return {
        ...state,
        currentView: action.payload
      }
    case "ADD_VIEW":
      let newViews = state.views.slice()
      newViews.push(action.payload)
      return {
        ...state,
        views: newViews
      }
    case "DELETE_VIEW":
      return {
        ...state,
        views: action.payload
      }
    case "FETCH_CAL":
      return {
        ...state,
        calendars: action.payload
      }
    case "FETCH_CURRENT_CALENDAR":
      return {
        ...state,
        currentCalendar: action.payload
      }
    case "UPDATE_VIEW":
      return {
        ...state,
        currentView: action.payload
      }
    case "ADD_CAL": {
      let newCalendars = state.calendars.slice()
      newCalendars.push(action.payload)
      return {
        ...state,
        calendars: newCalendars
      }
    }
    case "DELETE_CALENDAR": {
      let newCalendars = state.calendars.filter(x => x._id !== action.payload)
      return {
        ...state,
        calendars: newCalendars
      }
    }

    case "UPDATE_CAL": {
      return {
        ...state,
        currentCalendar: action.payload
      }
    }

    default:
      return initialState
  }
}