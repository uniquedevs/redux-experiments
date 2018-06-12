import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import { updateImages } from './folder-app/reducers';

import App from './app';
import folderAppReducer from './folder-app/reducers';

const appDiv = document.getElementById('app');

const logger = createLogger();

const middleware = [logger, thunk];

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(...middleware)
);

const store = createStore(folderAppReducer, {}, enhancer);

const disaptch = store.dispatch;

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  appDiv
);

disaptch(updateImages);


