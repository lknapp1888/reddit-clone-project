import { createSlice } from '@reduxjs/toolkit'

export const modalToggleSlice = createSlice({
  name: 'modalToggle',
  initialState: {
    value: false
  },
  reducers: {
    showModal: state => {
      state.value = true
    },
    hideModal: state => {
      state.value = false;
    },
  }
})

// Action creators are generated for each case reducer function
export const { showModal, hideModal } = modalToggleSlice.actions

export default modalToggleSlice.reducer