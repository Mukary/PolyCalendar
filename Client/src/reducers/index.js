const initialState = {
  calendars: ["MON","TUE","WED", "THU", "FRI"],
  views: ["V1", "V2", "V3"]
}

export default function (state = initialState, action) {
  switch(action.type) {
    case "ADD_DAY":
      return {
        ...state,
        calendars: ["HELLO"]
      }
    default:
      return initialState
  }
}