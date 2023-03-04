import { RootState } from "../storage"
import { useAppSelector } from "../storage/redux-hooks"

const themeSelector = (state: RootState) => state.theme;

export default function useThemedClass(className: string) {
  const { theme } = useAppSelector(themeSelector);
  
  if (theme === 'dark') {
    return className;
  } else {
    return `light ${className}`;
  }
}