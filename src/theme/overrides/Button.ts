import { type Components } from "@mui/material";

export default function Button() {
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
