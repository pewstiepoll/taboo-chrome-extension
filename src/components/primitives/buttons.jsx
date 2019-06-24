import React from "react";
import PropTypes from "prop-types";

import styles from "./buttons.module.css";

export function Button({ styleType, size, ...props }) {
  const classes = [
    styles.button,
    styles[`button--${styleType}`],
    styles[`button--${size}`]
  ];

  return <button className={classes.join(" ")} {...props} />;
}

Button.defaultProps = {
  styleType: "primary",
  size: "standard"
};

Button.propTypes = {
  styleType: PropTypes.oneOf(["primary", "notice", "danger"]),
  size: PropTypes.oneOf(["short", "standard", "long"])
};
