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
      <input
        className={styles["field-input"]}
        ref={input => {
          refs.push(input);
        }}
        key={fieldProps.name}
        {...fieldProps}
      />
      <label className={styles["field-label"]} htmlFor={fieldProps.name}>
        {fieldProps.label || fieldProps.placeholder || fieldProps.name}
      </label>
    </div>
  ));
};

const createButtons = buttons => () => {
  return buttons.map((buttonProps, id) => <Button key={id} {...buttonProps} />);
};

const BaseModal = withModal(function BaseModal({ modal, closeModal }) {
  const { fields = [], buttons = [] } = modal.params;

  const Fields = createFields(fields);
  const Buttons = createButtons(buttons);

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
            <div className={styles["modal-footer"]}>
              <Buttons />
            </div>
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
      buttons: [],
      onSubmit: () => {}
    }
  }
};

BaseModal.propTypes = {
  modal: PropTypes.shape({
    params: PropTypes.shape({
      title: PropTypes.string,
      fields: PropTypes.array,
      buttons: PropTypes.array,
      onSubmit: PropTypes.func.isRequired
    })
  })
};

export default React.memo(BaseModal);
