import React from "react";
import ReactDOM from "react-dom";
import Shortcuts from "components/modules/shortcuts";
import Todos from "components/modules/todos";
import BaseModal from "components/modules/modal/base-modal";

import { useModal, ModalContext } from "components/modules/modal";

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
