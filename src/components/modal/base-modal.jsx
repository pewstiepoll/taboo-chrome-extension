import React from "react";
import { withModal, Modal } from "./index";

import styles from "./base-modal.module.css";

const BaseModal = withModal(function SimpleModal({ closeModal, ...props }) {
  return (
    <Modal {...props}>
      <div onClick={closeModal} className={styles["modal-overlay"]}>
        <div
          onClick={e => e.stopPropagation()}
          className={styles["modal-container"]}
        >
          I'm am a simple modal
        </div>
      </div>
    </Modal>
  );
});

export default BaseModal;
