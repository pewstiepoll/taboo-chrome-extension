import React from "react";
import Icon from "./icon";

export function ConfigIcon(props) {
  return (
    <Icon {...props}>
      <circle cx="50" cy="30" r="7" />
      <circle cx="50" cy="50" r="7" />
      <circle cx="50" cy="70" r="7" />
    </Icon>
  );
}
