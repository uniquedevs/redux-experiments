import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';

import App from './app';
import { appReducer } from './reducers';

const appDiv = document.getElementById('app');

const logger = createLogger();

const store = createStore(appReducer, {}, applyMiddleware(logger));

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  appDiv
);


