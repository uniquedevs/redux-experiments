import expect, { createSpy, spyOn, isSpy } from 'expect';
import deepFreeze from 'deep-freeze';

const todos = (store = [], action) => {
  switch( action.type) {
    case 'ADD_TODO' :
      return [
        ...store,
        {
          id: action.id,
          text: action.text,
          complete: false
        }
      ];
    default :
      return state;
  }
};

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
    todos(stateBeforeAdd, action)
  ).toEqual(stateAfterAdd)
};

testAddTodo();

console.log('all tests pass');