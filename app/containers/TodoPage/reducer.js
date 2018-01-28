/*
 *
 * TodoPage reducer
 *
 */

import { fromJS } from 'immutable';
import uuidv1 from 'uuid/v1';
import {
  CHANGE_INPUT, ADD_TODO, TOGGLE_COMPLETE_TODO, DELETE_TODO, CHANGE_TAB,
} from './constants';

const initialState = fromJS({
  inputValue: '',
  todoList: [],
  tabValue: 0
});

function todoPageReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_INPUT:
      return state.set('inputValue', action.value);
    case ADD_TODO:
      const item = fromJS({
        id: uuidv1(),
        term: action.term,
        isCompleted: false
      })
      return state.update('todoList', list => list.push(item))
    case TOGGLE_COMPLETE_TODO:
      return state.update('todoList', list => list.map((item) => item.get('id') === action.id? item.update('isCompleted', value => !value): item))
    case DELETE_TODO:
      return state.update('todoList', list => list.filter((item) => item.get('id')!==action.id))
    case CHANGE_TAB:
      return state.set('tabValue', +action.index)
      default:
      return state;
  }
}

export default todoPageReducer;
