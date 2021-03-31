import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
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

export const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
