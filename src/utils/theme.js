// src/utils/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // 파란색
    },
    secondary: {
      main: "#dc004e", // 분홍색
    },
    white: {
      main: "#f0f0f0",
    },
    black: {
      main: "#333",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: {
      fontSize: "2.5rem",
      fontWeight: 500,
    },
  },
});

export default theme;
