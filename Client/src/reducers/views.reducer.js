const initialState = {
  views: []
}

export default function (state = initialState, action) {
  console.log(action)
  switch(action.type) {
    case "ADD_VIEW":
      const newViews = state.views.slice()
      newViews.push(action.payload)
      return {
        ...state,
        views: newViews
      }
    case "FETCH_VIEWS":
      return {
        ...state,
        views: action.payload
      }
    default:
      return initialState
  }
}