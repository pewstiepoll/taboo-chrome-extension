import React from "react";
import ReactDOM from "react-dom";
import Shortcuts from "./components/shortcuts";
import { Provider as ModalProvider } from "./components/modal/modalContext";
import SimpleModal from "./components/modal/simple-modal";

import "./styles.css";

function App() {
  return (
    <ModalProvider>
      <div className="App">
        <Shortcuts />
        <SimpleModal />
      </div>
    </ModalProvider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
