import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// ROUTER
import { BrowserRouter } from "react-router-dom";

// REACT QUERY
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// MAIN APP COMPONENT
import App from "./App.tsx";

// TAILWIND + MATERIAL TAILWIND
import "./index.css";
import { ThemeProvider } from "@material-tailwind/react";

// CREATE QUERY CLIENT
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
