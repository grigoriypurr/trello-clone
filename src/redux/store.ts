import { configureStore } from '@reduxjs/toolkit';
import listsReducer from './listsSlice';
import cardsReducer from './cardsSlice';
import commentsreducer from './commentsSlice';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    lists: listsReducer,
    cards: cardsReducer,
    comments: commentsreducer,
    user: userReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
