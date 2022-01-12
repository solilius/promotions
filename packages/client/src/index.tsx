import React from "react";
import "./index.css";
import ReactDOM from "react-dom";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import { PromotionsContextProvider } from "./contexts/promotiosContext";

ReactDOM.render(
  <React.StrictMode>
    <PromotionsContextProvider>
      <App />
    </PromotionsContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
