import React from "react";
import { createRoot } from "react-dom/client";

import App from "#/app/App";

const domNode = document.getElementById("root");

if (domNode) {
  const root = createRoot(domNode);

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
} else {
  console.error("No element found with id #root");
}
