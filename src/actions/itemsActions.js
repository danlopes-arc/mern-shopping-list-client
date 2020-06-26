import { ITEMS_ADD, ITEMS_DELETE, ITEMS_GET, ITEMS_LOADING } from './types'
import axios from 'axios'
export const getItems = () => async dispach => {
  dispach(setItemsLoading())
  try {
    const res = await axios.get('/api/items')
    return dispach({
      type: ITEMS_GET,
      payload: res.data
    })
  } catch (err) {

  }  
}

export const addItem = (item) => async dispacth => {
  try {
    const res = await axios.post('api/items', item)
    dispacth({
      type: ITEMS_ADD,
      payload: res.data
    })
  } catch (err) {
    
  }
}

export const deleteItem = (id) => async dispatch => {
  try {
    await axios.delete(`api/items/${id}`)
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