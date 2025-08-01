import "@seed-design/css/base.css";
import "@stackflow/plugin-basic-ui/index.css";
import "./styles/App.css";

import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "./lib/stackflow";
import { queryClient } from "./lib/react-query/queryClient";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack />
    </QueryClientProvider>
  );
}

export default App;
