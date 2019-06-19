import React from "react";
import ReactDOM from "react-dom";

import styles from "./modal.module.css";

export default function Modal({ children }) {
  const modalElement = document.getElementById("modal");

  return ReactDOM.createPortal(
    <div className={styles.modal}>{children}</div>,
    modalElement
  );
}
