import React from "react";
import PropTypes from "prop-types";

import styles from "./shortcut.module.css";

export default function Shortcut({ title, link }) {
  const icon = title.charAt(0).toUpperCase();

  return (
    <a rel="noopener" target="__blank" className={styles.shortcut} href={link}>
      <div className={styles["shortcut-icon"]}>{icon}</div>
      <div className={styles["shortcut-title-container"]}>
        <span className={styles["shortcut-title"]}>{title}</span>
      </div>
    </a>
  );
}

Shortcut.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired
};
