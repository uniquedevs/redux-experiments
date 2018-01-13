import React from 'react';
import ReactDOM from 'react-dom';
//import { createStore } from 'redux';

import expect, { createSpy, spyOn, isSpy } from 'expect'

const divApp = document.getElementById('app');

const App = ({state, onIncrease, onDecrease}) => (
  <div>
    <p>{state}</p>
    <input type='button' onClick={onIncrease} value="+"/>
    <input type='button' onClick={onDecrease} value="-"/>
  </div>
);

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

const createStore = reducer => {
  let listenners = [], state;

  const getState = () => {
    console.log(state);
    return state;
  };
  const dispatch = (action) => {
    state = reducer(state, action);
    listenners.forEach( listenner => listenner());
  };
  const subscribe = (listenner) => {
    listenners.push(listenner);
    return () => {
      listenners.filter( l => l === listenner ? listenners.remove(listenner) : null)
    }
  };

  dispatch( {type:''} );

  return {
    getState, dispatch, subscribe
  }

};

const store = createStore(counter);

const increase = () => {
  store.dispatch( {type:'INCREASE'} );
};

const decrease = () => {
  store.dispatch( {type:'DECREASE'} );
};

const render = () => {
  ReactDOM.render(
    <App
      state={ store.getState() }
      onIncrease={ increase }
      onDecrease={ decrease }
    />,
    divApp
  )
}

store.subscribe(render);

render();
