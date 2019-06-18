import React from "react";
import PropTypes from "prop-types";

import styles from "./shortcut.module.css";

export default function Shortcut({ title, link, icon, ...rest }) {
  const iconToRender = icon || title.charAt(0).toUpperCase();

  return (
    <a rel="noopener" target="__blank" className={styles.shortcut} href={link} {...rest}>
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
  icon: ""
}

Shortcut.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  icon: PropTypes.string
};
