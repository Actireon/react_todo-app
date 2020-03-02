import { ADD_TODO, DELETE_TODO, EDIT_TODO, TOGGLE_TODO } from '../actions';

const todoReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        id: action.id,
        title: action.title,
        completed: false,
      };

    case TOGGLE_TODO:
      if (state.id !== action.id) {
        return state;
      }

      return Object.assign({}, state, {
        completed: !state.completed,
      });

    case EDIT_TODO:
      if (state.id !== action.id) {
        return state;
      }

      return Object.assign({}, state, {
        title: action.title,
      });

    default:
      return state;
  }
};

export default function reducer(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [...state, todoReducer(undefined, action)];

    case DELETE_TODO: {
      const todos = state.filter(todo => todo.id !== action.id);

      return [...todos];
    }

    case TOGGLE_TODO:
      return state.map(todo => todoReducer(todo, action));

    case EDIT_TODO:
      return state.map(todo => todoReducer(todo, action));

    default:
      return state;
  }
}

export const getFilteredTodos = (state, filter) => {
  switch (filter) {
    case 'ALL':
      return state;

    case 'COMPLETED':
      return state.filter(todo => todo.completed);

    case 'UNCOMPLETED':
      return state.filter(todo => !todo.completed);

    default:
      return state;
  }
};
