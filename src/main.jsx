import React from "react";
import ReactDOM from "react-dom/client";

import "./index.scss";

import Application from "./components/Application";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Application />
  </React.StrictMode>
);
