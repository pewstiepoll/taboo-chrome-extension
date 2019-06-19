import React from "react";
import PropTypes from "prop-types";

import styles from "./shortcut.module.css";

export default function Shortcut({
  title,
  link,
  icon,
  className,
  isShape,
  ...rest
}) {
  const iconToRender = icon || title.charAt(0).toUpperCase();
  const shapedClass = isShape ? styles["--shaped"] : "";

  return (
    <a
      rel="noopener"
      target="__blank"
      className={`${styles.shortcut} ${shapedClass} ${className}`}
      href={link}
      {...rest}
    >
      <div className={styles["shortcut-icon"]}>{iconToRender}</div>
      <div className={styles["shortcut-title-container"]}>
        <span className={styles["shortcut-title"]}>{title}</span>
      </div>
    </a>
  );
}

Shortcut.defaultProps = {
  title: "",
  link: "",
  icon: "",
  isShape: false,
  className: ""
};

Shortcut.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  icon: PropTypes.string,
  isShape: PropTypes.bool,
  className: PropTypes.string
};