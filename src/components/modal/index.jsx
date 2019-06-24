import React from "react";
import ReactDOM from "react-dom";

export const MODAL_HTML_ELEMENT_ID = "modal";

export function useModal() {
  const modal = {
    isOpen: false,
    params: {}
  };

  const [modalState, setModalState] = React.useState(modal);

  return {
    modal: modalState,
    openModal: (params = modal) => setModalState({ isOpen: true, params }),
    closeModal: () => setModalState(modal),
    toggleModal: (params = modal) =>
      setModalState(({ isOpen }) => ({ isOpen: !isOpen, params }))
  };
}

export function Modal({ children, isOpen }) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    children,
    document.getElementById(MODAL_HTML_ELEMENT_ID)
  );
}

export const ModalContext = React.createContext({});

export function withModal(Component) {
  return props => (
    <ModalContext.Consumer>
      {context => <Component {...props} {...context} />}
    </ModalContext.Consumer>
  );
}
