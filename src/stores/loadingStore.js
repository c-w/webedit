import { createSlice } from '@reduxjs/toolkit';

export const loadingSlice = createSlice({
  name: 'loading',
  initialState: false,
  reducers: {
    set: (state, action) => action.payload,
  },
});

export const { set } = loadingSlice.actions;

export const selectLoading = (state) => state.loading;

export default loadingSlice.reducer;
