import { type PropsWithChildren, useMemo, useState } from "react";
import { ThemeProvider as MuiThemeProvider, type Theme, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "./GlobalStyles";
import { defaultLightThemeOptions } from "./DefaultLightTheme";
import { defaultDarkThemeOptions } from "./DefaultDarkTheme";
import { ThemeContext } from "./ThemeContext";
import type { Mode } from "./ThemeInterface";
import ComponentsOverrides from "./overrides";
import { useLocalStorage } from "../lib/hooks/useLocalStorage";

export default function ThemeProvider({ children }: PropsWithChildren) {
  const [lsTheme, setLsTheme] = useLocalStorage<Mode>("mode", "dark");
  const [mode, setMode] = useState<Mode>(lsTheme ? lsTheme : "dark");
  const themeMode = useMemo(
    () => ({
      toggleThemeMode: () => {
        setMode((prevMode: Mode) => (prevMode === "light" ? "dark" : "light"));
        setLsTheme((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
      setThemeMode: (newMode: Mode) => {
        setMode(newMode);
        setLsTheme(newMode);
      },
      mode: mode,
    }),
    [mode, setLsTheme]
  );

  const theme = createTheme(mode === "dark" ? defaultDarkThemeOptions : defaultLightThemeOptions) as Theme;

  theme.components = ComponentsOverrides(theme);

  const globalStyles = <GlobalStyles />;

  return (
    <ThemeContext.Provider value={themeMode}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {globalStyles}
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}
