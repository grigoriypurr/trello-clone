import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: '',
  reducers: {
    setUserName: (state, action: PayloadAction<string>) => action.payload,
  },
});

export const { setUserName } = userSlice.actions;

export default userSlice.reducer;
