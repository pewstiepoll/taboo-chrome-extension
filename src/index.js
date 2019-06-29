import React from "react";
import ReactDOM from "react-dom";
import Shortcuts from "components/complex/shortcuts";
import Todos from "components/complex/todos";
import BaseModal from "components/complex/modal/base-modal";

import { useModal, ModalContext } from "components/complex/modal";

import "./styles.css";

function App() {
  return (
    <ModalContext.Provider value={useModal()}>
      <div className="App">
        <Shortcuts />
        <Todos />
        <BaseModal />
      </div>
    </ModalContext.Provider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
