import React from 'react';
import { connect } from "react-redux";

import { mapDispatchToAddProps as mapDispatchToProps} from '../reducers/todos'

let AddTodo = ({ addTodo }) => {
  let todoInput = null;
  return (
    <div>
      <input type='text'
             ref={ node => todoInput = node }
      />
      <button onClick={ () => addTodo(todoInput.value) }>
        ADD
      </button>
    </div>
  )
};

export default AddTodo = connect(null, mapDispatchToProps)(AddTodo);
