
import { fromJS } from 'immutable';
import todoPageReducer from '../reducer';

describe('todoPageReducer', () => {
  it('returns the initial state', () => {
    expect(todoPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
