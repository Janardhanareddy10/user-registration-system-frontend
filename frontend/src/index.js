import React from "react";
import ReactDOM from "react-dom/client"; // ✅ Import createRoot instead of render
import { Provider } from "react-redux";
import { store } from "./redux/store";
import App from "./App";

// ✅ Use createRoot instead of render
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
