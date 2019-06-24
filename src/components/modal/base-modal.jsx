import React from "react";
import PropTypes from "prop-types";
import { withModal, Modal } from "./index";

import styles from "./base-modal.module.css";

const BaseModal = withModal(function BaseModal({ modal, closeModal }) {
  const { fields = [] } = modal.params;

  const Fields = () =>
    fields.length ? fields.map(fieldProps => <input {...fieldProps} />) : null;

  return (
    <Modal {...modal}>
      <div onClick={closeModal} className={styles["modal-overlay"]}>
        <div
          onClick={e => e.stopPropagation()}
          className={styles["modal-container"]}
        >
          Title: {modal.params.title}
          <Fields />
        </div>
      </div>
    </Modal>
  );
});

BaseModal.defaultProps = {
  modal: {
    params: {
      title: "",
      fields: []
    }
  }
};

BaseModal.propTypes = {
  modal: PropTypes.shape({
    params: PropTypes.shape({
      title: PropTypes.string,
      fields: PropTypes.array
    })
  })
};

export default BaseModal;
