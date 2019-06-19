import React from "react";
import ReactDOM from "react-dom";
import Shortcuts from "./components/shortcuts";

import "./styles.css";

function useModal() {
  const [isOpen, setIsOpen] = React.useState(false);

  return {
    isOpen,
    openModal: () => setIsOpen(true),
    closeModal: () => setIsOpen(false),
    toggleModal: () => setIsOpen(({ isOpen }) => ({ isOpen: !isOpen }))
  };
}

function Modal({ children, isOpen }) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>{children}</>,
    document.getElementById("modal")
  );
}

const SimpleModal = withModal(function SimpleModal(props) {
  return <Modal {...props}>I'm am a simple modal</Modal>;
});

const ModalContext = React.createContext({});

function withModal(Component) {
  return props => (
    <ModalContext.Consumer>
      {context => <Component {...props} {...context} />}
    </ModalContext.Consumer>
  );
}

const ToggleModal = withModal(({ openModal }) => (
  <button onClick={openModal}>ToggleModal</button>
));

function App() {
  return (
    <ModalContext.Provider value={useModal()}>
      <div className="App">
        is modal open: {}
        <ToggleModal />
        <Shortcuts />
        <SimpleModal />
      </div>
    </ModalContext.Provider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
