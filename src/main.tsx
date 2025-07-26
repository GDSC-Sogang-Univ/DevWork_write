import "@stackflow/plugin-basic-ui/index.css";
import "./styles/globalSeedDesign.ts";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

async function enableMocking() {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  const { server } = await import("./api/msw/index.ts");

  return server.start({
    onUnhandledRequest: "bypass",
  });
}

enableMocking().then(() => {
  console.log("MSW enabled");
  const rootNode = document.getElementById("root") as HTMLElement;
  ReactDOM.createRoot(rootNode).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
