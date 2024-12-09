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
import { AuthProvider } from "./hooks/context/auth.context.ts";

// CREATE QUERY CLIENT
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
