import React from "react";

const modalProviderValue = {
  isOpen: false,
  openModal() {
    this.isOpen = true;
  },
  closeModal() {
    this.isOpen = false;
  }
};

const ModalContext = React.createContext();

export const Provider = props => (
  <ModalContext.Provider value={modalProviderValue} {...props} />
);

export const withModal = Component => props => (
  <ModalContext.Consumer>
    {modalProps => <Component {...modalProps} {...props} />}
  </ModalContext.Consumer>
);
