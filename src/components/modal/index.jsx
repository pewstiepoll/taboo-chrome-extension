import React from "react";
import ReactDOM from "react-dom";

export const MODAL_HTML_ELEMENT_ID = "modal";

export function useModal() {
  const [isOpen, setIsOpen] = React.useState(false);

  return {
    isOpen,
    openModal: () => setIsOpen(true),
    closeModal: () => setIsOpen(false),
    toggleModal: () => setIsOpen(({ isOpen }) => ({ isOpen: !isOpen }))
  };
}

export function Modal({ children, isOpen }) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>{children}</>,
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
