import { configureStore } from '@reduxjs/toolkit';
import modalToggleReducer from '../features/modals/modalToggleSlice';

export default configureStore({
  reducer: {
    modalToggle: modalToggleReducer
  }
})