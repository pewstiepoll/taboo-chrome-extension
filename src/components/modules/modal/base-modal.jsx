import React from "react";
import PropTypes from "prop-types";
import { withModal, Modal } from "./index";
import { Button } from "components/composites";
import { Stack, Box, Cluster } from "components/primitives";
import { formDataToObject } from "components/utils";

import styles from "./base-modal.module.css";

const createFields = fields => () => {
  const refs = [];

  React.useEffect(() => {
    if (refs[0]) refs[0].focus();
  }, [refs]);

  return fields.map(fieldProps => (
    <Stack reversed className={styles["field"]} key={fieldProps.name}>
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
    </Stack>
  ));
};

const createButtons = buttons => () => {
  return buttons.map((buttonProps, id) => <Button key={id} {...buttonProps} />);
};

/**
 * Base modal form components
 */
export const BaseModalHeader = ({ title }) => (
  <h1 className={styles["modal-header"]}>{title}</h1>
);

export const BaseModalContent = ({ fields = [] }) => {
  if (!fields.length) return null;

  const Fields = createFields(fields);

  return (
    <div className="modal-content">
      <Fields />
    </div>
  );
};

export const BaseModalFooter = ({ buttons = [] }) => {
  if (!buttons.length) return null;

  const Buttons = createButtons(buttons);

  return (
    <Cluster align="right" className={styles["modal-footer"]}>
      <Buttons />
    </Cluster>
  );
};

/**
 * Base modal form composition
 */
export const BaseModalForm = withModal(({ modal, closeModal }) => {
  const { fields = [], buttons = [] } = modal.params;

  return (
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
      <Stack>
        <BaseModalHeader title={modal.params.title} />
        <BaseModalContent fields={fields} />
        <BaseModalFooter buttons={buttons} />
      </Stack>
    </form>
  );
});

export const BaseModalContainer = () => (
  <Box
    alignment={{ horizontal: "center", vertical: "center" }}
    onClick={e => e.stopPropagation()}
    className={styles["modal-container"]}
  >
    <BaseModalForm />
  </Box>
);

/**
 * Base modal component
 */
const BaseModal = withModal(function BaseModal({ modal, closeModal }) {
  return (
    <Modal {...modal}>
      <Box onClick={closeModal} className={styles["modal-overlay"]}>
        <BaseModalContainer />
      </Box>
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
