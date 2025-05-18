import { Outlet } from "react-router";
import ThemeSwitcherButton from "../components/themeSwitcher";
import { Stack, Typography } from "@mui/material";
import { useContext } from "react";
import { ThemeContext } from "../theme/ThemeContext";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import BrightnessHighIcon from "@mui/icons-material/BrightnessHigh";

function BaseLayout() {
  const themeContext = useContext(ThemeContext);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh", maxWidth: "100vw", alignItems: "center" }}
    >
      <Stack width="100%" alignItems={"flex-start"} sx={{ padding: 2 }}>
        <Typography variant="h5">Anime Search App</Typography>
        <Stack sx={{ position: "absolute", right: 0 }}>
          <ThemeSwitcherButton
            variant="text"
            tooltipTitle={`Switch to ${themeContext.mode === "dark" ? "light" : "dark"} mode`}
          >
            {themeContext.mode === "dark" ? <BrightnessHighIcon /> : <DarkModeIcon />}
          </ThemeSwitcherButton>
        </Stack>
      </Stack>
      <div style={{ display: "flex", flexGrow: 1, padding: "20px", maxWidth: "1200px" }}>
        <Outlet />
      </div>
    </div>
  );
}

export default BaseLayout;
