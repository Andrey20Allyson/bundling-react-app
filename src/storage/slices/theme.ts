import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Theme = 'dark' | 'light';

export interface ThemeState {
  theme: Theme;
}

const initialState: ThemeState = {
  theme: 'light',
};

const slice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    darkMode(state: ThemeState) {
      state.theme = 'dark';
    },
    lightMode(state: ThemeState) {
      state.theme = 'light';
    }
  }
});

export default slice.reducer; 