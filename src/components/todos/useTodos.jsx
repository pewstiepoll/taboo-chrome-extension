import { useReducer } from "react";
import { bindActionCreator } from "../../utils";

/**
 * Action types
 */
export const TODOS_ADD_TODO = "TODOS_ADD_TODO";
export const TODOS_REMOVE_TODO = "TODOS_REMOVE_TODO";
export const TODOS_UPDATE_TODO = "TODOS_UPDATE_TODO";
export const TODOS_TOGGLE_TODO = "TODOS_TOGGLE_TODO";

/**
 * Actions
 */
export const addTodo = todo => ({
  type: TODOS_ADD_TODO,
  payload: { todo }
});

export const removeTodo = ({ id, title }) => ({
  type: TODOS_REMOVE_TODO,
  payload: {
    id,
    title
  }
});

export const updateTodo = ({ id, title }, updates) => ({
  type: TODOS_UPDATE_TODO,
  payload: {
    id,
    title,
    updates
  }
});

export const toggleTodo = ({ id, title }) => ({
  type: TODOS_TOGGLE_TODO,
  payload: {
    id,
    title
  }
});

export function todosReducer({ todos }, action) {
  switch (action.type) {
    default:
      break;
  }
}

export const todosInitialState = {
  todos: []
};

export default function useTodos() {
  const [todos, dispatch] = useReducer(todosReducer, todosInitialState);

  const actions = {
    addTodo: bindActionCreator(dispatch, addTodo),
    removeTodo: bindActionCreator(dispatch, removeTodo),
    updateTodo: bindActionCreator(dispatch, updateTodo),
    toggleTodo: bindActionCreator(dispatch, toggleTodo)
  };

  return {
    todos,
    actions
  };
}
