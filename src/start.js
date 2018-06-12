import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';

import App from './app';
import folderAppReducer from './folder-app/reducers';

const appDiv = document.getElementById('app');

const logger = createLogger();

const store = createStore(folderAppReducer, {}, applyMiddleware(logger));

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  appDiv
);


