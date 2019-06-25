import React from "react";

export function ConfigIcon({
  size = 100,
  bulletSize = 3,
  itemClass,
  ...props
}) {
  return (
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
}
