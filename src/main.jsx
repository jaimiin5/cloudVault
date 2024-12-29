import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { NextUIProvider } from "@nextui-org/react";
import { ReloadProvider } from "./context/ReloadContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <ReloadProvider>
        <NextUIProvider>
          <App />
        </NextUIProvider>
      </ReloadProvider>
  </StrictMode>
);
