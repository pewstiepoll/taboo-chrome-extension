import { useReducer } from "react";
import { bindActionCreator } from "components/utils";

/**
 * Action types
 */
export const TODOS_ADD_TODO = "TODOS_ADD_TODO";
export const TODOS_REMOVE_TODO = "TODOS_REMOVE_TODO";
export const TODOS_UPDATE_TODO = "TODOS_UPDATE_TODO";
export const TODOS_TOGGLE_TODO = "TODOS_TOGGLE_TODO";
export const TODOS_REMOVE_COMPLETED_TODOS = "TODOS_REMOVE_COMPLETED_TODOS";

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

export const removeCompleted = () => ({
  type: TODOS_REMOVE_COMPLETED_TODOS
});

export function todosReducer({ todos }, { type, payload }) {
  switch (type) {
    case TODOS_ADD_TODO:
      return { todos: [...todos, payload.todo] };

    case TODOS_TOGGLE_TODO:
      return {
        todos: todos.map(todo => {
          if (todo.id === payload.id) {
            todo.toggle();
          }

          return todo;
        })
      };

    case TODOS_REMOVE_TODO:
      return {
        todos: todos.filter(
          todo => todo.id !== payload.id && todo.title !== payload.title
        )
      };

    case TODOS_REMOVE_COMPLETED_TODOS:
      return {
        todos: todos.filter(todo => !todo.checked)
      };

    default:
      break;
  }
}

export const todosInitialState = {
  todos: []
};

export default function useTodos() {
  const [{ todos }, dispatch] = useReducer(todosReducer, todosInitialState);

  const actions = {
    addTodo: bindActionCreator(dispatch, addTodo),
    removeTodo: bindActionCreator(dispatch, removeTodo),
    updateTodo: bindActionCreator(dispatch, updateTodo),
    toggleTodo: bindActionCreator(dispatch, toggleTodo),
    removeCompleted: bindActionCreator(dispatch, removeCompleted)
  };

  return {
    todos,
    actions
  };
}
