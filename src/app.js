import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

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

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(appReducer, /* preloadedState, */ composeEnhancers(
  applyMiddleware(thunk)
));

const storeNoThunk = createStore(appReducer);

ReactDOM.render(
  <Provider store={store}>
    <TodoApp/>
  </Provider>,
  appDiv
);


