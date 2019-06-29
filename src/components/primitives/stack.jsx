import React from "react";
import PropTypes from "prop-types";
import { mergeClassNames } from "../../utils";

import styles from "./stack.module.css";

export function getStackReversedStyles(isReversed) {
  return isReversed ? styles["stack--reversed"] : styles["stack--default"];
}

export function Stack({ reversed, className: classNameProp, ...props }) {
  // Collect stack classes
  const stackClasses = mergeClassNames(
    styles["stack"],
    getStackReversedStyles(reversed),
    classNameProp
  );

  return <div className={stackClasses} {...props} />;
}

Stack.defaultProps = {
  reversed: false,
  className: ""
};

Stack.propTypes = {
  reversed: PropTypes.bool,
  className: PropTypes.string
};
