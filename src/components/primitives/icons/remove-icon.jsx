import React from "react";
import Icon from "./icon";

export function RemoveIcon({ circleWidth = 10, lineWidth = 10, ...props }) {
  const size = 100;
  return (
    <Icon {...props}>
      <circle fill="none" cx="50" cy="50" r={size / 2.5} />
      <line
        x1={size * (2 / 7)}
        y1={size * (2 / 7)}
        x2={size * (5 / 7)}
        y2={size * (5 / 7)}
      />
      <line
        x1={size * (2 / 7)}
        y1={size * (5 / 7)}
        x2={size * (5 / 7)}
        y2={size * (2 / 7)}
      />
    </Icon>
  );
}
