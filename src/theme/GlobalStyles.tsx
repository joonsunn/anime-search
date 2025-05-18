import { GlobalStyles as MuiGlobalStyle } from "@mui/material";
import { useTheme } from "@mui/material/styles";

function GlobalStyles() {
  const theme = useTheme();

  return (
    <MuiGlobalStyle
      styles={{
        "*": {
          boxSizing: "border-box",
          overscrollBehavior: "none",
          minWidth: 0,
        },
        html: {
          margin: 0,
          padding: 0,
          width: "100%",
          height: "100%",
          WebkitOverflowScrolling: "touch",
          scrollbarGutter: "stable",
          colorScheme: theme.palette?.mode === "dark" ? "dark" : "light",
        },
        body: {
          margin: 0,
          padding: 0,
          width: "100%",
          height: "100%",
          overflowY: "scroll",
        },
        "h1, h2, h3, h4, h5, h6": {
          //   fontFamily: "Nunito, sans-serif",
        },
        "html,body": {
          maxWidth: "2560px",
          margin: "0 auto",

          // minWidth: '1200px',
        },
        "#root": {
          width: "100%",
          height: "100%",
          scrollBehavior: "smooth",
        },
        "[role=button]": {
          cursor: "pointer",
        },
        input: {
          "&[type=number]": {
            MozAppearance: "textfield",
            "&::-webkit-outer-spin-button": {
              margin: 0,
              WebkitAppearance: "none",
            },
            "&::-webkit-inner-spin-button": {
              margin: 0,
              WebkitAppearance: "none",
            },
          },
          "-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 100px #000000 inset !important",
            WebkitTextFillColor: "#ffffff",
          },
        },
        img: {
          display: "block",
          maxWidth: "100%",
        },
        ul: {
          margin: 0,
          padding: 0,
        },
        a: {
          textDecoration: "none",
          "&:hover": {
            textDecoration: "underline",
          },
        },
      }}
    />
  );
}

export default GlobalStyles;
