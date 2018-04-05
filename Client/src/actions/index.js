import store from '../store/store'

export function fetchUserProfile(profile) {
    store.dispatch({
      type:"FETCH_USER_PROFILE",
      payload: profile
    })
}

export function addView(view) {
  store.dispatch({
    type:"ADD_VIEW",
    payload: view
  })
}

export function fetchViews(views) {
  store.dispatch({
    type:"FETCH_VIEWS",
    payload: views
  })
}

export function deleteView(views) {
  store.dispatch({
    type:"DELETE_VIEW",
    payload: views
  })
}

export function fetchCalendars(calendars) {
  store.dispatch({
    type:"FETCH_CAL",
    payload: calendars
  })
}

export function addCalendar(calendar) {
  store.dispatch({
    type:"ADD_CAL",
    payload: calendar
  })
}

export function addCalendarsToView(viewId, calendars){
  store.dispatch({
    type:"ADD_CALS_VIEW",
    payload: {
      viewId: viewId,
      calendars: calendars
    }
  })
}