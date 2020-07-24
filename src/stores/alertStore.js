import { createSlice } from '@reduxjs/toolkit';

export const alertSlice = createSlice({
  name: 'alert',
  initialState: null,
  reducers: {
    set: (state, action) => action.payload,
    clear: (state, action) => null,
  },
});

export const { set, clear } = alertSlice.actions;

export const get = (state) => state.alert;

export default alertSlice.reducer;
