import { ITEMS_ADD, ITEMS_DELETE, ITEMS_GET, ITEMS_LOADING } from '../actions/types'

const initialState = {
  list: [],
  loading: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    case ITEMS_GET:
      return {
        ...state,
        list: action.payload,
        loading: false
      }
    case ITEMS_ADD:
      return {
        ...state,
        list: [action.payload, ...state.list]
      }
    case ITEMS_DELETE:
      return {
        ...state,
        list: state.list.filter(item => item._id !== action.payload)
      }
      case ITEMS_LOADING:
        return {
          ...state,
          loading: true
        }
    default:
      return state
  }
}