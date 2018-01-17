import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { appReducer } from './reducers';

const store = createStore(appReducer);
const appDiv = document.getElementById('app');

let todoIndex = 0;

const Todo = ({onClick, complete, text}) => (
  <li
    onClick={onClick}
    style={ complete ? {'textDecoration':'line-through'} : {}}>
    {text}
  </li>
);

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

const AddTodo = ({ onAddClick }) => {
  let todoInput = null;
  return (
    <div>
      <input type='text'
           ref={ node => todoInput = node }
      />
      <button onClick={ () => onAddClick(todoInput.value)}>
        ADD
      </button>
  </div>)
};

const Footer = () => (
  <div>
    <FilterLink filter='ALL'>Show all</FilterLink>
    <FilterLink filter='ACTIVE'>Show only active</FilterLink>
  </div>
);

const Link = ({ text, active, onClick }) => {
  return active ? <span>{text}</span>  : <button onClick={ onClick }>{text}</button>
};

const FilterLink = ({filter, children}) => {
  const props = store.getState();
  const dispatch = store.dispatch;
  return (
    <Link
      active={filter === props.visibilityFilter}
      text={children}
      onClick={ () => {
        dispatch({
          type: 'SET_VISIBILITY_FILTER',
          filter
        })
      }}
    />
  )
};

const TodoApp = ( props ) => {
  return (
    <div>
      <AddTodo
        onAddClick={ text => {
          store.dispatch(
            {
              type: 'ADD_TODO',
              text: text,
              id: todoIndex++
            })
          }
        }
      />
      <TodoList
        todos={getVisibilityTodos(props)}
        onTodoClick={ id => {
          store.dispatch(
            {
              type: 'TOGGLE_TODO',
              id
            }
          )
        }}
      />
      <Footer/>

    </div>
  )
};

const getVisibilityTodos = ({todos, visibilityFilter}) => {
  switch(visibilityFilter) {
    case 'ALL':
      return todos;
    case 'ACTIVE':
      return todos.filter( todo => !todo.complete );
  }
};

const render = () => (
  ReactDOM.render(
    <TodoApp { ...store.getState() }/>,
      appDiv
    )
);

store.subscribe(render);

render();


