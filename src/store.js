import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

const initialState = {}

const middleware = [thunk]

const reduxDevtoolsExtension = process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    reduxDevtoolsExtension || (arg => arg)
  )
)

export default store