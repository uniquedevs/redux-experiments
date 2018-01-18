import React from 'react';

import Todo from './Todo';

const TodoList = ({ todos, onTodoClick }) => (
  <ul>
    {todos ? todos.map( (todo, idx) => (
      <Todo
        key={idx}
        {...todo}
        onClick={ () => onTodoClick(todo.id) }
      />
    )) : null}
  </ul>
);

export default TodoList;