import React from "react";

import { storiesOf } from "@storybook/react";
// import { linkTo } from '@storybook/addon-links';

import { Button } from "../components/primitives";

const Group = ({ title, colWidth = 100, children }) => (
  <>
    <h4>{title}:</h4>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(auto-fit, ${colWidth}px)`
      }}
    >
      {children}
    </div>
  </>
);

storiesOf("Primitives", module).add("Buttons", () => (
  <div>
    <Group title="Types">
      <Button>Primary</Button>
      <Button config={{ type: "notice" }}>Notice</Button>
      <Button config={{ type: "danger" }}>Danger</Button>
    </Group>
    <Group title="Sizes">
      <Button config={{ size: "short" }}>Short</Button>
      <Button config={{ size: "standard" }}>Standard</Button>
      <Button config={{ size: "long" }}>Long</Button>
    </Group>
    <Group title="Background">
      <Button config={{ backgrounded: true }}>True</Button>
      <Button config={{ backgrounded: false }}>False</Button>
    </Group>
    <Group title="Border">
      <Button config={{ backgrounded: false, bordered: true }}>True</Button>
      <Button config={{ backgrounded: false, bordered: false }}>False</Button>
    </Group>
  </div>
));
