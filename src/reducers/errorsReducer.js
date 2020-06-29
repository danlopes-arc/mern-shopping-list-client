import { ERRORS_CLEAR, ERRORS_GET } from '../actions/types'

const initialState = {
  msg: '',
  status: null,
  id: null
}

export default function (state = initialState, action) {
  switch (action.type) {
    case ERRORS_GET:
      return { ...action.payload }
    case ERRORS_CLEAR:
      return initialState
    default:
      return state
  }
}