import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth';
import { dailySlice } from './daily';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    daily: dailySlice.reducer
  },
});
