import { configureStore, combineReducers } from '@reduxjs/toolkit';

import user from './user';
import dataSource from './data-source';

const rootReducer = combineReducers({
  user,
  dataSource,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
