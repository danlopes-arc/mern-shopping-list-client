import { ITEMS_ADD, ITEMS_DELETE, ITEMS_GET, ITEMS_LOADING } from './types'
import axios from 'axios'
import { tokenReqConfig } from './authActions'

export const getItems = () => async (dispatch, getState) => {

  dispatch(setItemsLoading())

  const reqConfig = tokenReqConfig(getState)

  try {
    const res = await axios.get('/api/items', reqConfig)
    return dispatch({
      type: ITEMS_GET,
      payload: res.data
    })
  } catch (err) {

  }  
}

export const addItem = (item) => async (dispatch, getState) => {

  const reqConfig = tokenReqConfig(getState)

  try {
    const res = await axios.post('api/items', item, reqConfig)
    dispatch({
      type: ITEMS_ADD,
      payload: res.data
    })
  } catch (err) {
    
  }
}

export const deleteItem = (id) => async (dispatch, getState) => {

  const reqConfig = tokenReqConfig(getState)

  try {
    await axios.delete(`api/items/${id}`, reqConfig)
    return dispatch({
      type: ITEMS_DELETE,
      payload: id
    })
  } catch (err) {
    
  }
}

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  }
}