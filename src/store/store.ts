import { configureStore } from '@reduxjs/toolkit';
import catListReducer from './catListSlice';

export const store = configureStore({
  reducer: {
    catList: catListReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
