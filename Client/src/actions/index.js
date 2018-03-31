import store from '../store/store'

export function fetchUserProfile(profile) {
    store.dispatch({
      type:"FETCH_USER_PROFILE",
      payload: profile
    })
}