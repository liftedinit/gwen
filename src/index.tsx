import React from "react";
import ReactDOM from "react-dom";
import { AppProvider } from "./providers/app";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
