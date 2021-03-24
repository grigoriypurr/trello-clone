import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import lists from './listsSlice';
import cards from './cardsSlice';
import comments from './commentsSlice';
import user from './userSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({ lists, cards, comments, user });
const persistedReducer = persistReducer(persistConfig, rootReducer);

export let store = configureStore({
  reducer: {
    persistedReducer,
  },
});

export let persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
