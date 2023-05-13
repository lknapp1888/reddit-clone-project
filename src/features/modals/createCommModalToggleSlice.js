import { createSlice } from '@reduxjs/toolkit'

export const createCommModalToggleSlice = createSlice({
  name: 'commModalToggle',
  initialState: {
    value: false
  },
  reducers: {
    showCommModal: state => {
      state.value = true
    },
    hideCommModal: state => {
      state.value = false;
    },
  }
})

// Action creators are generated for each case reducer function
export const { showCommModal, hideCommModal } = createCommModalToggleSlice.actions

export default createCommModalToggleSlice.reducer