import { INPUT_BAR, TOGGLE_CHECK } from '../actions/types.js';

const initialState = {
  inputBar: true,
  checks: [true, false]
};

const UIReducer = (state = initialState, action) => {
  switch (action.type) {
    case INPUT_BAR:
      return {...state, inputBar: action.inputBar};
    case TOGGLE_CHECK:
      return {...state, checks: action.checks};
  }
  return state;
}

export default UIReducer;
