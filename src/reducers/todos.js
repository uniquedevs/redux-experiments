import { toggleTodo, addTodo } from '../actions';

const todo = (state, action) => {
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

const todos = (state = [], action) => {
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

export default todos;

const getVisibilityTodos = ({todos, visibilityFilter}) => {
  switch(visibilityFilter) {
    case 'ALL':
      return todos;
    case 'ACTIVE':
      return todos.filter( todo => !todo.complete );
  }
};

export const mapStateToProps = (state) => ({
  todos: getVisibilityTodos(state)
});

export const mapDispatchToProps = (dispatch) => ({
    onTodoClick: id => {
      dispatch(toggleTodo(id))
    }
  }
);

export const mapDispatchToAddProps = {
  addTodo
};