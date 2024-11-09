import { createSlice } from '@reduxjs/toolkit';

const sliceName = 'user';

const slice = createSlice({
  initialState: {
    name: null,
    email: null,
    token: null,
  },
  name: sliceName,
  reducers: {
    setUser: (state, { payload }) => {
      return { ...state, name: payload?.name, email: payload?.email };
    },
  },
  selectors: {
    selectStore: (state) => state,
  },
});

export const { setUser } = slice.actions;
export const { selectStore } = slice.selectors;
export default slice.reducer;
