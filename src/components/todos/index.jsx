import React from "react";
import PropTypes from "prop-types";
import uuidV4 from "uuid/v4";
import { Todo as TodoClass } from "../../classes";

import styles from "./todos.module.css";

export function Todo({ todo: { id, title, checked }, ...props }) {
  const inputName = `todo-${id}`;
  return (
    <div className={styles["todo"]}>
      <input
        className={styles["todo--input"]}
        id={inputName}
        name={inputName}
        type="checkbox"
        defaultChecked={checked}
        {...props}
      />
      <label className={styles["todo--input-label"]} htmlFor={inputName}>
        {title}
      </label>
    </div>
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
    new TodoClass(uuidV4(), "My second todo", true)
  ];

  return (
    <div className={styles["todos-container"]}>
      {mocks.map(todo => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
