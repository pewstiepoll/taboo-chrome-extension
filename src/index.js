import React from "react";
import ReactDOM from "react-dom";
import Shortcuts from "./components/shortcuts";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <Shortcuts />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
