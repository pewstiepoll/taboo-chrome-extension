import React from "react";
import PropTypes from "prop-types";
import { withModal, Modal } from "./index";
import { Button } from "../primitives";

import styles from "./base-modal.module.css";

function formDataToObject(formData) {
  const result = {};

  for (let [key, value] of formData.entries()) {
    result[key] = value;
  }

  return result;
}

const createFields = fields => () => {
  const refs = [];

  React.useEffect(() => {
    if (refs[0]) refs[0].focus();
  }, [refs]);

  return fields.map(fieldProps => (
    <div className={styles["field"]} key={fieldProps.name}>
      <label className={styles["field-label"]} htmlFor={fieldProps.name}>
        {fieldProps.label || fieldProps.placeholder || fieldProps.name}
      </label>
      <input
        className={styles["field-input"]}
        ref={input => {
          refs.push(input);
        }}
        key={fieldProps.name}
        {...fieldProps}
      />
    </div>
  ));
};

const BaseModal = withModal(function BaseModal({ modal, closeModal }) {
  const { fields = [] } = modal.params;

  const Fields = createFields(fields);

  return (
    <Modal {...modal}>
      <div onClick={closeModal} className={styles["modal-overlay"]}>
        <div
          onClick={e => e.stopPropagation()}
          className={styles["modal-container"]}
        >
          <h1 className={styles["modal-title"]}>{modal.params.title}</h1>
          <form
            onSubmit={e => {
              e.preventDefault();

              // Collect form data from the DOM
              const result = formDataToObject(new FormData(e.target));

              // Send form data up to the parent
              if (typeof modal.params.onSubmit === "function")
                modal.params.onSubmit(result);

              // Close modal
              closeModal();
            }}
            className={styles["modal-form"]}
          >
            <Fields />
            <Button type="submit">Add</Button>
            <Button onClick={closeModal}>Cancel</Button>
          </form>
        </div>
      </div>
    </Modal>
  );
});

BaseModal.defaultProps = {
  modal: {
    params: {
      title: "",
      fields: [],
      onSubmit: () => {}
    }
  }
};

BaseModal.propTypes = {
  modal: PropTypes.shape({
    params: PropTypes.shape({
      title: PropTypes.string,
      fields: PropTypes.array,
      onSubmit: PropTypes.func.isRequired
    })
  })
};

export default BaseModal;
