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