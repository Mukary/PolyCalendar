const initialState = {
  calendars: ["MON","TUE","WED", "THU", "FRI"],
  views: ["V1", "V2", "V3"],
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
    default:
      return initialState
  }
}