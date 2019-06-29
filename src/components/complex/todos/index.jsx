import React from "react";
import PropTypes from "prop-types";
import uuidV4 from "uuid/v4";
import { Todo as TodoClass } from "classes";
import { Button } from "components/composites";
import { RemoveIcon } from "components/icons";

import styles from "./todos.module.css";
import { Box, Cluster } from "components/primitives";

export const TodoInput = ({ id, checked, ...props }) => (
  <input
    className={styles["todo--input"]}
    id={id}
    name={id}
    type="checkbox"
    defaultChecked={checked}
    {...props}
  />
);

export const TodoLabel = ({ id, title }) => (
  <label className={styles["todo--input-label"]} htmlFor={id}>
    {title}
    <RemoveIcon
      onClick={e => {
        e.preventDefault();
      }}
      className={styles["todo--remove-todo"]}
    />
  </label>
);

export function Todo({ todo: { id, title, checked }, ...props }) {
  return (
    <Cluster align="stretch" className={styles["todo"]}>
      <TodoInput id={id} checked={checked} {...props} />
      <TodoLabel id={id} title={title} />
    </Cluster>
  );
}

Todo.propTypes = {
  todo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired
  }).isRequired
};

export default function Todos() {
  const mocks = [
    new TodoClass(uuidV4(), "My first todo"),
    new TodoClass(uuidV4(), "My second todo", true),
    new TodoClass(
      uuidV4(),
      "My kinda quite long todo to make it look more realistic [SUPERTASK-2299]",
      true
    )
  ];

  return (
    <Box className={styles["todos-module"]}>
      <Button
        config={{ backgrounded: false, bordered: false, size: "fit" }}
        className={styles["todos-module--title"]}
        text={"Add Todo..."}
      />
      <Box className={styles["todos"]}>
        {mocks.map(todo => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </Box>
    </Box>
  );
}
