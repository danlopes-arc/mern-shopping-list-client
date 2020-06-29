import axios from 'axios'

import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from './types'

import { returnErrors } from './errorsActions'

export const loadUser = () => async (dispach, getState) => {

  dispach({ type: USER_LOADING })

  const reqConfig = tokenReqConfig(getState)

  try {
    const res = await axios.get('/api/auth/user', reqConfig)
    return dispach({
      type: USER_LOADED,
      payload: res.data
    })
  } catch (err) {
    dispach(returnErrors(err.response.data.msg, err.response.status))
    return dispach({
      type: AUTH_ERROR
    })
  }
}

export const register = ({ name, email, password }) => async (dispatch, getState) => {
  const reqConfig = tokenReqConfig(getState)

  try {
    const res = await axios.post(
      '/api/users',
      { name, email, password },
      reqConfig
    )
    return dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL
    })
    return dispatch(returnErrors(err.response.data.msg, err.response.status, REGISTER_FAIL))
  }

}

export const login = ({ email, password }) => async dispatch => {

  try {
    const res = await axios.post('/api/auth', { email, password })
    return dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    })
  } catch (err) {
    dispatch({ type: LOGIN_FAIL })
    console.log(err.response)
    return dispatch(returnErrors(err.response.data.msg, err.response.status, LOGIN_FAIL))
  }
}

export const logout = () => ({
  type: LOGOUT_SUCCESS
})

export const tokenReqConfig = getState => {
  const token = getState().auth.token
  const reqConfig = {
    headers: {}
  }
  if (token) reqConfig.headers['x-auth-token'] = token
  return reqConfig
}