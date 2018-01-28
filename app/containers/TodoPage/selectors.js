import { createSelector } from 'reselect';
import {toJS} from 'immutable';
/**
 * Direct selector to the todoPage state domain
 */
const selectTodoPageDomain = (state) => state.get('todoPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by TodoPage
 */

const makeSelectInputValue = () => createSelector(
  selectTodoPageDomain,
  (substate) => substate.get('inputValue')
);
const makeSelectTabValue = () => createSelector(
  selectTodoPageDomain,
  (substate) => substate.get('tabValue')
);

const makeSelectTodoList = () => createSelector(
  selectTodoPageDomain,
  (substate) => substate.get('todoList').toJS()
)

export {
  selectTodoPageDomain,
  makeSelectInputValue,
  makeSelectTodoList,
  makeSelectTabValue
};
