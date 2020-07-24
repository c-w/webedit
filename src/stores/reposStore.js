import { createSlice } from '@reduxjs/toolkit';

export const repoSlice = createSlice({
  name: 'repos',
  initialState: [],
  reducers: {
    add: (state, action) => state.concat(action.payload),
    clear: (state, action) => [],
  },
});

export const { add, clear } = repoSlice.actions;

export const get = (state) => state.repos;

export default repoSlice.reducer;
