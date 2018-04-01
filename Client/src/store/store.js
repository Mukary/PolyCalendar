import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import items from '../reducers/index'
import views from '../reducers/views.reducer'

const reducer = combineReducers({
  items,
  views
})

const middleware = applyMiddleware(thunkMiddleware)
const store = createStore(reducer, middleware)

export default store