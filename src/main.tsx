import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./router.tsx";
import { QueryClientProvider } from "./api/QueryClientProvider.tsx";
import { CssBaseline } from "@mui/material";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider>
      <CssBaseline />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
