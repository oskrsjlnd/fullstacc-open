import { createSlice } from '@reduxjs/toolkit'


const notificationSlicer = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    set_notification(state, action) {
      return action.payload
    },
    remove_notification(state) {
      return null
    }
  }
})

export const { set_notification, remove_notification } = notificationSlicer.actions

export const setNotification = (message, time) => {
  return dispatch => {
    dispatch(set_notification(message))
    setTimeout(() => {
      dispatch(remove_notification())
    }, time*1000)
  }
}
export default notificationSlicer.reducer