import React from "react";
import PropTypes from "prop-types";

import styles from "./buttons.module.css";

export function Button({ styleType, ...props }) {
  const classes = [styles.button, styles[`button--${styleType}`]];

  return <button className={classes.join(" ")} {...props} />;
}

Button.defaultProps = {
  styleType: "primary"
};

Button.propTypes = {
  styleType: PropTypes.oneOf(["primary", "notice", "danger"])
};
