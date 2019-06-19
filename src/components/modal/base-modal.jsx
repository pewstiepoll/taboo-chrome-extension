import React from "react";
import { withModal, Modal } from "./index";

const BaseModal = withModal(function SimpleModal(props) {
  return <Modal {...props}>I'm am a simple modal</Modal>;
});

export default BaseModal;
