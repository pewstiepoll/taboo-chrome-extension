import { useReducer } from "react";

export function todosReducer(state, action) {
  switch (action.type) {
    default:
      break;
  }
}

export const todosInitialState = {
  todos: []
};

export default function useTodos() {
  const [todos, dispatch] = useReducer(todosReducer);

  const actions = {};

  return {
    todos,
    actions
  };
}
