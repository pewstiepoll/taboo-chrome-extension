import React from "react";
import PropTypes from "prop-types";

import styles from "./shortcut.module.css";

const ConfigIcon = ({ size = 100, bulletSize = 3, itemClass, ...props }) => (
  <svg
    {...props}
    viewBox={`0 0 ${size} ${size}`}
    xmlns="http://www.w3.org/2000/svg"
  >
      <circle cx={size * (3 / 6)} cy={size * (2 / 6)} r={bulletSize} />
      <circle cx={size * (3 / 6)} cy={size * (3 / 6)} r={bulletSize} />
      <circle cx={size * (3 / 6)} cy={size * (4 / 6)} r={bulletSize} />
  </svg>
);

export default function Shortcut({
  title,
  link,
  icon,
  className,
  isShape,
  onConfigClick,
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
      <ConfigIcon
        onClick={onConfigClick}
        size={50}
        className={styles["shortcut-config-icon"]}
      />
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
