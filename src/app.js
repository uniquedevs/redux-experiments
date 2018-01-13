import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

import expect, { createSpy, spyOn, isSpy } from 'expect'

const divApp = document.getElementById('app');

const App = () => (<div>{store.getState()}</div>);

const counter = (state = 0, action)  => {
  switch (action.type) {
    case 'INCREASE' :
      return state + 1;
    case 'DECREASE':
      return state - 1;
    default:
      return state;
  }
};

const store = createStore(counter);

const increase = () => {
  store.dispatch( {type:'INCREASE'} );
};

const render = () => {
  document.body.innerText = store.getState();
};

store.subscribe(render);

document.addEventListener('click', increase);

render();

class AppClass extends React.Component {
  render() {
    return <div>{store.getState()}</div>
  }
}

// ReactDOM.render(
//   <App/>,
//   divApp
// )
