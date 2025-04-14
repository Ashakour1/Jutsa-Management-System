import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import store from "./app/store";
import { Provider } from "react-redux";
import { UserProvider } from "./hooks/useUser";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <UserProvider>
      <App />
    </UserProvider>
  </Provider>
  // </React.StrictMode>
);