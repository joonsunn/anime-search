declare module "@mui/material/styles" {
  interface Theme {
    // status: {
    //   danger: string;
    // };
    // mood?: string;
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    // status?: {
    //   danger?: string;
    // };
    // mood?: string;
  }

  interface PaletteColor {
    [key: string]: string;
  }
}

export type Mode = "light" | "dark";

export interface IThemeContext {
  toggleThemeMode: () => void;
  setThemeMode: (newMode: Mode) => void;
  mode: Mode;
}
