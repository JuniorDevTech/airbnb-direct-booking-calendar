import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import App from "./App";

import { AuthProvider } from "./context/AuthContext";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <App />
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
      }}
    />
  </AuthProvider>,
);
