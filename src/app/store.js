import { configureStore } from '@reduxjs/toolkit';
import modalToggleReducer from '../features/modals/modalToggleSlice';
import commModalToggleReducer from '../features/modals/createCommModalToggleSlice';

export default configureStore({
  reducer: {
    modalToggle: modalToggleReducer,
    createCommModalToggle: commModalToggleReducer,
  }
})