import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { IntlayerProvider } from "react-intlayer";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <IntlayerProvider>
      <App />
    </IntlayerProvider>
  </React.StrictMode>
);