import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: '',
  reducers: {
    getUserName: (state, action: PayloadAction<string>) => {
      if (!action.payload) return;
      return (state = action.payload);
    },
  },
});

export const { getUserName } = userSlice.actions;

export default userSlice.reducer;