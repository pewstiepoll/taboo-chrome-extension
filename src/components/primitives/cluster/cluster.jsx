import React from "react";
import PropTypes from "prop-types";

import styles from "./cluster.module.css";
import { mergeClassNames } from "components/utils";

/**
 * Cluster is a block component for displaying and aligning inline children
 */

export function getClusterChildrenAlignmentClasses(align) {
  return [styles["cluster"], styles[`cluster-align--${align}`]];
}

export function Cluster({ align, className: classNameProp, ...props }) {
  const clusterClasses = mergeClassNames(
    classNameProp,
    getClusterChildrenAlignmentClasses(align)
  );
  return <div className={clusterClasses} {...props} />;
}
