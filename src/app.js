import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

import { appReducer } from './reducers';


const appDiv = document.getElementById('app');

let todoIndex = 0;

const Todo = ({ onClick, complete, text }) => (
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

const Footer = () => (
  <div>
    <FilterLink filter='ALL'>Show all</FilterLink>
    <FilterLink filter='ACTIVE'>Show only active</FilterLink>
  </div>
);

class FilterLink extends Component {
  componentDidMount() {
    const { store } = this.context;
    this.unsubcribe = store.subscribe( () => {
      this.forceUpdate();
    })
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  render() {
    const { store } = this.context;
    const { visibilityFilter } = store.getState();
    const dispatch = store.dispatch;
    const { filter, children } = this.props;
    return (
      <Link
        active={filter === visibilityFilter}
        text={children}
        onClick={ () => {
          dispatch({
            type: 'SET_VISIBILITY_FILTER',
            filter
          })
        }}
      />
    )
  }
}

FilterLink.contextTypes = {
  store: PropTypes.object
};

const Link = ({ text, active, onClick }) => {
  return active ? <span>{text}</span>  : <button onClick={ onClick }>{text}</button>
};

class VisibleTodoList extends Component {
  componentDidMount() {

    const {store} = this.context;
    this.unsubcribe = store.subscribe( () => {
      this.forceUpdate();
    })
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  render() {
    const {store} = this.context;
    const state = store.getState();
    const todos = getVisibilityTodos(state);
    const dispatch = store.dispatch;

    return (
      <TodoList
        todos={todos}
        onTodoClick={ id => {
          dispatch(
            {
              type: 'TOGGLE_TODO',
              id
            }
          )
        }}
      />
    )
  }
}

VisibleTodoList.contextTypes = {
  store: PropTypes.object
};

const AddTodo = (props, { store }) => {
  const dispatch = store.dispatch;
  let todoInput = null;
  return (
    <div>
      <input type='text'
             ref={ node => todoInput = node }
      />
      <button onClick={ () => {
        dispatch(
          {
            type: 'ADD_TODO',
            text: todoInput.value,
            id: todoIndex++
          }
        )
      }}>
      ADD
      </button>
    </div>
  )
};

AddTodo.contextTypes = {
  store: PropTypes.object
};

const TodoApp = () => {
  return (
    <div>
      <AddTodo/>
      <VisibleTodoList/>
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

class Provider extends Component {
  getChildContext() {
    return {
      store: this.props.store
    };
  }
  render() {
    return this.props.children;
  }
}

Provider.childContextTypes = {
  store: PropTypes.object
};


ReactDOM.render(
  <Provider store={ createStore(appReducer) }>
    <TodoApp/>
  </Provider>,
  appDiv
);


