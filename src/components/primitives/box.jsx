import React from "react";
import PropTypes from "prop-types";

import styles from "./box.module.css";
import { mergeClassNames } from "../../utils";

export function getAlignmentClasses(alignHorizontal, alignVertical) {
  return [
    styles["box"],
    styles[`box-horizontal-align--${alignHorizontal}`],
    styles[`box-vertical-align--${alignVertical}`]
  ];
}

export function Box({
  alignment = { horizontal: "left", vertical: "left" },
  vertical,
  className: classNameProp,
  ...props
}) {
  const alignmentClasses = [
    classNameProp,
    getAlignmentClasses(alignment.horizontal, alignment.vertical)
  ];

  return <div className={mergeClassNames(...alignmentClasses)} {...props} />;
}

Box.defaultProps = {
  alignment: {
    horizontal: "left",
    vertical: "left"
  }
};

Box.propTypes = {
  alignment: PropTypes.shape({
    horizontal: PropTypes.oneOf(["left", "right", "center", "stretch"]),
    vertical: PropTypes.oneOf(["top", "bottom", "center", "stretch"])
  })
};
