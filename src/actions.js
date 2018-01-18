export const toggleTodo = id => {
  return {
    type: 'TOGGLE_TODO',
    id
  }
};

export const setVisibilityFilter = (filter) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  }
};

export const addTodo = ( todoIndex => text => {
  return {
    type: 'ADD_TODO',
    text,
    id: todoIndex++
  }
})(0);

