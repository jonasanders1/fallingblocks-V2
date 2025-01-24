import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import GlobalStyles from "./styles/globalStyles.ts";
import { ThemeProvider } from "./contexts/ThemeContext";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <GlobalStyles />
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);

