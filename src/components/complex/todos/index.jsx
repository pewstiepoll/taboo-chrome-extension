import React from "react";
import PropTypes from "prop-types";
import uuidV4 from "uuid/v4";
import { Todo as TodoClass } from "classes";
import useTodos from "./useTodos";
import { withModal } from "components/complex/modal";
import { Box, Cluster } from "components/primitives";
import { Button } from "components/composites";
import { RemoveIcon } from "components/icons";

import styles from "./todos.module.css";
import { Stack } from "../../primitives";

export const TodoInput = ({ id, checked, ...props }) => (
  <input
    className={styles["todo--input"]}
    id={id}
    name={id}
    type="checkbox"
    checked={checked}
    {...props}
  />
);

export const TodoLabel = ({ id, title, removeTodo }) => (
  <label className={styles["todo--input-label"]} htmlFor={id}>
    {title}
    <RemoveIcon
      onClick={e => {
        e.preventDefault();
        removeTodo({ id });
      }}
      className={styles["todo--remove-todo"]}
    />
  </label>
);

export function Todo({
  todo: { id, title, checked },
  actions: { toggleTodo, removeTodo },
  ...props
}) {
  return (
    <Cluster align="stretch" className={styles["todo"]}>
      <TodoInput
        id={id}
        checked={checked}
        onChange={() => toggleTodo({ id })}
        {...props}
      />
      <TodoLabel id={id} title={title} removeTodo={removeTodo} />
    </Cluster>
  );
}

Todo.propTypes = {
  todo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired
  }).isRequired
};

const openAddTodoModal = ({ openModal, closeModal, addTodo }) =>
  openModal({
    title: "Add todo",
    fields: [
      {
        type: "text",
        name: "todo_title",
        label: "Title",
        placeholder: "Title..."
      }
    ],
    buttons: [
      {
        type: "submit",
        text: "Add"
      },
      {
        type: "button",
        text: "Cancel",
        config: {
          type: "danger"
        },
        onClick: closeModal
      }
    ],
    onSubmit: ({ todo_title }) => {
      const newTodo = TodoClass.factory({
        id: uuidV4(),
        title: todo_title
      });

      addTodo(newTodo);

      closeModal();
    }
  });

export const AddTodoButton = withModal(({ openModal, closeModal, addTodo }) => (
  <Button
    config={{ backgrounded: false, bordered: false, size: "fit" }}
    className={styles["todos-module--title"]}
    text={"Add Todo..."}
    onClick={() => openAddTodoModal({ openModal, closeModal, addTodo })}
  />
));

export const TodoList = withModal(function TodoList({ todos, actions }) {
  return (
    <Stack reversed className={styles["todos"]}>
      {todos.map(todo => (
        <Todo key={todo.id} todo={todo} actions={actions} />
      ))}
    </Stack>
  );
});

export function Todos() {
  const { actions, todos } = useTodos();

  const { addTodo } = actions;

  return (
    <Box className={styles["todos-module"]}>
      <AddTodoButton addTodo={addTodo} />
      <TodoList todos={todos} actions={actions} />
    </Box>
  );
}

export default React.memo(Todos);
