import expect, { createSpy, spyOn, isSpy } from 'expect';
import deepFreeze from 'deep-freeze';
//import { combineReducers } from 'redux';

export const todo = (state, action) => {
  switch( action.type ) {
    case 'ADD_TODO' :
      return {
        id: action.id,
        text: action.text,
        complete: false
      };
    case 'TOGGLE_TODO' :
      return {
        ...state,
        complete: state.id === action.id ? !state.complete : state.complete
      };
    default :
      return state;
  }
};

export const todos = (state = [], action) => {
  switch( action.type) {
    case 'ADD_TODO' :
      return [
        ...state,
        todo(undefined, action)
      ];
    case 'TOGGLE_TODO' :
      return state.map( t => todo(t, action));
    default :
      return state;
  }
};

export const visibilityFilter = (state = 'VISIBLE', action) => {
  switch(action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
};

export const appReducerManual = (state = {}, action) => {
  return {
      todos: todos(
        state.todos,
        action
      ),
      visibilityFilter: visibilityFilter(
        state.visibilityFilter,
        action
      )
    }
};

const combineReducers = (reducers) => (state = {}, action) => {
  return Object.keys(reducers).reduce(
    (nextState, key) => Object.assign(nextState, {[key] : reducers[key].call(null, state[key], action)}), {}
  )
};

export const appReducer = combineReducers({
  todos,
  visibilityFilter
});