/*
 *
 * TodoPage actions
 *
 */

import {
  CHANGE_INPUT,
  ADD_TODO,
  TOGGLE_COMPLETE_TODO,
  DELETE_TODO,
  CHANGE_TAB
} from './constants';

export function changeInput(value) {
  return {
    type: CHANGE_INPUT,
    value
  };
}

export function addTodo(term) {
  return {
    type: ADD_TODO,
    term
  }
}
export function toggleCompleteTodo(id) {
  return {
    type: TOGGLE_COMPLETE_TODO,
    id
  }
}
export function deleteTodo(id) {
  return {
    type: DELETE_TODO,
    id
  }
}
export function changeTab(index) {
  return {
    type: CHANGE_TAB,
    index
  }
}