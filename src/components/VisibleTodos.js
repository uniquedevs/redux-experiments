import React from 'react';
import {connect} from "react-redux";

import TodoList from './TodoList';
import { mapStateToProps, mapDispatchToProps } from '../reducers/todos';

const VisibleTodoList = connect(mapStateToProps, mapDispatchToProps)(TodoList);

export default VisibleTodoList;