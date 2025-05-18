import { type ReactElement, useContext } from "react";
import { Button, Tooltip } from "@mui/material";
import { ThemeContext } from "../theme/ThemeContext";

interface ThemeSwitcherButtonProps {
  variant?: "contained" | "outlined" | "text";
  tooltipTitle?: string;
  children: ReactElement | string;
}

export default function ThemeSwitcherButton({
  variant = "contained",
  tooltipTitle,
  children,
  ...props
}: ThemeSwitcherButtonProps) {
  const themeContext = useContext(ThemeContext);

  function handleSwitchTheme() {
    themeContext.toggleThemeMode();
  }
  return (
    <Tooltip title={tooltipTitle || "Toggle Dark Mode"}>
      <Button onClick={handleSwitchTheme} variant={variant} {...props}>
        {children}
      </Button>
    </Tooltip>
  );
}
