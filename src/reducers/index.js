import { combineReducers } from 'redux'
import itemsReducer from './itemsReducer'
import errorsReducer from './errorsReducer'
import authReducer from './authReducer'

export default combineReducers({
  items: itemsReducer,
  errors: errorsReducer,
  auth: authReducer
})