import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import VisibleTodoList from './components/VisibleTodos';
import Footer from './components/Footer';
import AddTodo from './components/AddTodo';

import { appReducer } from './reducers';

const appDiv = document.getElementById('app');

const TodoApp = () => {
  return (
    <div>
      <AddTodo/>
      <VisibleTodoList/>
      <Footer/>
    </div>
  )
};

ReactDOM.render(
  <Provider store={ createStore(appReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) }>
    <TodoApp/>
  </Provider>,
  appDiv
);


