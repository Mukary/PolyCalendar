import store from '../store/store'

export function resetWeek() {
    store.dispatch({
      type: "ADD_DAY",
      payload: null
    })
}