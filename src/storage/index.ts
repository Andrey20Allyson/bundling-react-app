import { configureStore } from '@reduxjs/toolkit';
import theme from './slices/theme';
import todos from './slices/todos';

export const store = configureStore({
  reducer: {
    todos,
    theme,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;