import { createSlice } from '@reduxjs/toolkit'


const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    set_filter(state, action) {
      return action.payload
    }
  }
})

// const filterReducer = (state='', action) => {
//   console.log(state, action)
//   switch (action.type) {
//     case 'set_filter':
//       return action.payload
//     default:
//       return state
//   }
// }

// export const filterChange = filter => {
//   return {
//     type: 'set_filter',
//     payload: filter
//   }
// }
export const { set_filter } = filterSlice.actions
export default filterSlice.reducer