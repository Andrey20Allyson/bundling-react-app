import React, { useMemo } from "react";
import { useAppDispatch } from "../storage/redux-hooks";
import { setTheme, Theme } from "../storage/slices/theme";
import useThemedClass from "../utils/useThemedClass";
import Switch from "./Switch";

export default function NavitationHeader() {
  const dispatch = useAppDispatch();
  const storedTheme = useMemo(() => {
    const storedTheme = (localStorage.getItem('theme') ?? 'dark') as Theme;
    return storedTheme;
  }, []);

  const switchInitialState = storedTheme === 'light';

  function switchTheme(theme: Theme) {
    localStorage.setItem('theme', theme);

    dispatch(setTheme(theme));
  }

  return (
    <div className={useThemedClass('header')}>
      <Switch
        initialState={switchInitialState}
        title="Light Mode"
        onSwitch={value => switchTheme(value ? 'light' : 'dark')} />
    </div>
  )
}