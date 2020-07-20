import { configureStore } from '@reduxjs/toolkit';
import userReducer from 'stores/userStore';

export default configureStore({
  reducer: {
    user: userReducer,
  },
});
