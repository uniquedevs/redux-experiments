import React from 'react';

const Todo = ({ onClick, complete, text }) => (
  <li
    onClick={onClick}
    style={ complete ? {'textDecoration':'line-through'} : {}}>
    {text}
  </li>
);

export default Todo;
