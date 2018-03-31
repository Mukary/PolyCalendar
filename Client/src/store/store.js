import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import items from '../reducers/index'

const reducer = combineReducers({
  items
})

const middleware = applyMiddleware(thunkMiddleware)
const store = createStore(reducer, middleware)

export default store