import React from "react";
import PropTypes from "prop-types";

import styles from "./button.module.css";

export const buttonDefaultConfigProps = {
  type: "primary",
  size: "standard",
  backgrounded: true,
  bordered: true
};

export function getStyleClasses(config, propClassName) {
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

  if (typeof propClassName === "string" && propClassName.length) {
    classes.push(propClassName);
  }

  return classes.length ? classes.join(" ") : "";
}

export const Button = ({ config, text, children, className, ...props }) => (
  <button className={getStyleClasses(config, className)} {...props}>
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
    size: PropTypes.oneOf(["short", "standard", "long", "fit"]),
    backgrounded: PropTypes.bool,
    bordered: PropTypes.bool
  }),
  text: PropTypes.string,
  children: PropTypes.string
};

export default Button;
