import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { NotContextProvider } from "./contexts/NotContext";
import { AuthContextProvider } from "./contexts/AuthContext.tsx";

createRoot(document.getElementById("root")!).render(
  <AuthContextProvider>
    <NotContextProvider>
      <App />
    </NotContextProvider>
  </AuthContextProvider>
);
