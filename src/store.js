import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

const initialState = {}

const middleware = [thunk]

/**
 * If in production or the browser doesn't
 * have the extension, returns a forward
 * function
 */
const reduxDevtoolsExtension = (
  process.env.NODE_ENV !== 'production' &&
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__()
 ) || (arg => arg)

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    reduxDevtoolsExtension
  )
)

export default store