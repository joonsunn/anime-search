import { type Components, type Theme } from "@mui/material";

export default function Button(theme: Theme) {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          // color: theme.palette.primary.main,
        },
      },
    },
  } as Components;
}
