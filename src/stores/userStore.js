import { createSlice } from '@reduxjs/toolkit';

export const questionSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    login: (state, action) => action.payload,
    logout: (state, action) => null,
  },
});

export const {
  login,
  logout,
} = questionSlice.actions;

export const selectUser = state => state.user;

export default questionSlice.reducer;
