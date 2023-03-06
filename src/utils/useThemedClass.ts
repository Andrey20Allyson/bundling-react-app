import { useAppSelector } from "../storage/redux-hooks";
import { themeSelector } from "../storage/slices/theme";

export default function useThemedClass(className: string) {
  const { theme } = useAppSelector(themeSelector);
  
  if (theme === 'dark') {
    return className;
  } else {
    return `light ${className}`;
  }
}