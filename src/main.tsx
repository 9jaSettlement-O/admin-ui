import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import { QueryProvider } from "@/services/shared/cache-query";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <BrowserRouter basename="/admin-ui">
        <App />
        <Toaster richColors position="top-right" />
      </BrowserRouter>
    </QueryProvider>
  </StrictMode>
);
