import { combineReducers } from 'redux';
import UIReducer from './UIReducer.js';
import AddressesReducer from './AddressesReducer.js';

const Reducer = combineReducers({
  UIReducer,
  AddressesReducer
});

export default Reducer;
