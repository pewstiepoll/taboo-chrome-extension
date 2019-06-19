import React from "react";
import ReactDOM from "react-dom";

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
    document.getElementById("modal")
  );
}

export const SimpleModal = withModal(function SimpleModal(props) {
  return <Modal {...props}>I'm am a simple modal</Modal>;
});

export const ModalContext = React.createContext({});

export function withModal(Component) {
  return props => (
    <ModalContext.Consumer>
      {context => <Component {...props} {...context} />}
    </ModalContext.Consumer>
  );
}
