// App Component
import React from "react";
import ReactDOM from "react-dom";
import DailyFocusPlanner from "./components/DailyFocusPlanner";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <DailyFocusPlanner />
  </React.StrictMode>,
  document.getElementById("root")
);