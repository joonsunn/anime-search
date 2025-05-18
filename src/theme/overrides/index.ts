import { type Theme } from "@mui/material";
import Button from "./Button";
import TextField from "./TextField";

export default function ComponentsOverrides(theme: Theme) {
  return Object.assign(Button(), TextField(theme), {
    MuiCssBaseline: {
      styleOverrides: `
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
      -webkit-box-shadow: 0 0 0 30px ${theme.palette.background.default} inset !important;
    }`,
    },
  });
}
