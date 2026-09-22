// main.tsx
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "urql";
import { createClient } from "./urql/urqlConfig";
import AppRoutes from "./routes/AppRoutes";
import ThemeModeProvider from "./themes/ThemeModeProvider";
import "./i18n";

export function Root() {
  const [client, setClient] = useState<any>(null);

  useEffect(() => {
    void createClient({
      getAccessToken: async () => localStorage.getItem("accessToken") ?? undefined,
      onError: (error) => console.error(error),
    }).then(setClient);
  }, []);

  if (!client) return null;

  return (
    <Provider value={client}>
      <BrowserRouter>
        <ThemeModeProvider>
          <AppRoutes />
        </ThemeModeProvider>
      </BrowserRouter>
    </Provider>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);