import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

export type Theme = 'dark' | 'light';

export interface ThemeState {
  theme: Theme;
}

const initialState: ThemeState = {
  theme: localStorage.getItem('theme') as Theme ?? 'dark',
};

export const slice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    darkMode(state: ThemeState) {
      state.theme = 'dark';
    },
    lightMode(state: ThemeState) {
      state.theme = 'light';
    },
    setTheme(state: ThemeState, action: PayloadAction<Theme>) {
      state.theme = action.payload;
    },
    switchTheme(state: ThemeState) {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      return state;
    },
  }
});

export function themeSelector(rootState: RootState) {
  return rootState.theme;
}

export const { darkMode, lightMode, setTheme, switchTheme } = slice.actions;
export default slice.reducer; 