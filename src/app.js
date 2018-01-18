import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { connect } from 'react-redux';

import { appReducer } from './reducers';

const appDiv = document.getElementById('app');

const setVisibilityFilter = (filter) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  }
};

const toggleTodo = id => {
  return {
    type: 'TOGGLE_TODO',
    id
  }
};

const addTodo = text => {
  let todoIndex = 0;
  return {
    type: 'ADD_TODO',
    text,
    id: todoIndex++
  }
};



const Todo = ({ onClick, complete, text }) => (
  <li
    onClick={onClick}
    style={ complete ? {'textDecoration':'line-through'} : {}}>
    {text}
  </li>
);

const Footer = () => (
  <div>
    <FilterLink filter='ALL'>Show all</FilterLink>
    <FilterLink filter='ACTIVE'>Show only active</FilterLink>
  </div>
);

const mapStateToLinkProps = ( store, ownProps ) => {
  return {
    active: ownProps.filter === store.visibilityFilter,
    text: ownProps.children
  }
};

const mapDispatchToLinkProps = (dispatch, ownProps) => {
  return {
    onClick:  () => {
      dispatch( setVisibilityFilter(ownProps.filter));
    }
  }
};

const Link = ({ text, active, onClick }) => {
  return active ? <span>{text}</span>  : <button onClick={ onClick }>{text}</button>
};

const FilterLink = connect(mapStateToLinkProps, mapDispatchToLinkProps)(Link);

const mapStateToProps = (state) => {
  return {
    todos: getVisibilityTodos(state)
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: id => {
      dispatch(toggleTodo(id))
    }
  }
};

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

const VisibleTodoList = connect(mapStateToProps, mapDispatchToProps)(TodoList);

VisibleTodoList.contextTypes = {
  store: PropTypes.object
};

let AddTodo = ({ dispatch }) => {
  let todoInput = null;
  return (
    <div>
      <input type='text'
             ref={ node => todoInput = node }
      />
      <button onClick={ () => {
        dispatch(addTodo(todoInput.value))
      }}>
      ADD
      </button>
    </div>
  )
};

AddTodo = connect()(AddTodo);

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


