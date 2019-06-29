import React from "react";
import PropTypes from "prop-types";

export default function Icon(props) {
  return (
    <svg
      {...props}
      viewBox={`0 0 100 100`}
      xmlns="http://www.w3.org/2000/svg"
    />
  );
}

Icon.defaultProps = {
  children: () => {}
};

Icon.propTypes = {
  children: PropTypes.func.isRequired
};
