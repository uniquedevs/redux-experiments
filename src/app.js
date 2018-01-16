import * as reducers from './reducers';
import { createStore } from 'redux';
import deepFreeze from "deep-freeze";
import expect from "expect";

const testAddTodo = () => {
  let stateBeforeAdd = [];
  let action = {
    type: 'ADD_TODO',
    id: 1,
    text: 'new'
  };
  let stateAfterAdd = [{
    id: 1,
    text: 'new',
    complete: false
  }];

  deepFreeze(stateBeforeAdd);
  deepFreeze(action);

  expect(
    reducers.todos(stateBeforeAdd, action)
  ).toEqual(stateAfterAdd)
};

const testToggleTodo = () => {
  let stateBeforeAdd = [{
    id: 1,
    text: 'new',
    complete: false
  }];
  let action = {
    type: 'TOGGLE_TODO',
    id: 1,
  };
  let stateAfterAdd = [{
    id: 1,
    text: 'new',
    complete: true
  }];

  deepFreeze(stateBeforeAdd);
  deepFreeze(action);

  expect(
    reducers.todos(stateBeforeAdd, action)
  ).toEqual(stateAfterAdd)
};

testAddTodo();

testToggleTodo();

console.log('simple reducers tests pass');

const testAppReducer = () => {
  const store = createStore(reducers.appReducer);
  let action = {
    type: 'ADD_TODO',
    id: 1,
    text: 'new'
  };
  let stateAfterAdd = {
    todos: [{
      id: 1,
      text: 'new',
      complete: false
    }],
    visibilityFilter: 'VISIBLE'
  };
  deepFreeze(action);

  store.dispatch(action);

  expect(
    store.getState()
  ).toEqual(stateAfterAdd);

  // let action2 = {
  //   type: 'SET_VISIBILITY_FILTER',
  //   filter: 'HIDDEN'
  // };
  // let stateAfterSetVisFilter = {
  //   todos: [{
  //     id: 1,
  //     text: 'new',
  //     complete: false
  //   }],
  //   visibilityFilter: 'HIDDEN'
  // };
  //
  // store.dispatch(action2);
  //
  // expect(
  //   store.getState()
  // ).toEqual(stateAfterSetVisFilter);

};

testAppReducer();

console.log('combined reducer tests pass');
