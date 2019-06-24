import React from "react";

import styles from "./buttons.module.css";

export function Button(props) {
  return <button className={styles.button} {...props} />;
}
