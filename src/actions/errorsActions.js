import { ERRORS_CLEAR, ERRORS_GET } from './types'

export const returnErrors = (msg, status, id = null) => {
  return {
    type: ERRORS_GET,
    payload: { msg, status, id }
  }
}

export const clearErrors = () => {
  return {
    type: ERRORS_CLEAR
  }
}