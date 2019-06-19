import React from "react";
import ReactDOM from "react-dom";
import Shortcuts from "./components/shortcuts";
import BaseModal from "./components/modal/base-modal";

import { useModal, ModalContext } from "./components/modal";

import "./styles.css";

function App() {
  return (
    <ModalContext.Provider value={useModal()}>
      <div className="App">
        <Shortcuts />
        <BaseModal />
      </div>
    </ModalContext.Provider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
