import React from "react";
import PropTypes from "prop-types";

import styles from "./buttons.module.css";

export const buttonDefaultConfigProps = {
  type: "primary",
  size: "standard",
  backgrounded: true,
  bordered: true
};

export function getStyleClasses(config) {
  const { type, size, backgrounded, bordered } = {
    ...buttonDefaultConfigProps,
    ...config
  };

  const classes = [styles.button, styles[`button--${size}`]];

  if (backgrounded) {
    classes.push(styles[`button--${type}__backgrounded`]);
  }

  if (bordered) {
    classes.push(styles[`button--${type}__bordered`]);
  }

  return classes.length ? classes.join(" ") : "";
}

export const Button = ({ config, text, children, ...props }) => (
  <button className={getStyleClasses(config)} {...props}>
    {text || children}
  </button>
);

Button.defaultProps = {
  config: buttonDefaultConfigProps,
  text: "",
  children: ""
};

Button.propTypes = {
  config: PropTypes.shape({
    type: PropTypes.oneOf(["primary", "notice", "danger"]),
    size: PropTypes.oneOf(["short", "standard", "long"]),
    backgrounded: PropTypes.bool,
    bordered: PropTypes.bool
  }),
  text: PropTypes.string,
  children: PropTypes.string
};
