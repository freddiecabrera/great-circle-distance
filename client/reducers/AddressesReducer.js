import { SET_ADDRESSES, SET_FILTERED_ADDRESSES } from '../actions/types.js';

const AddressesReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_ADDRESSES:
      return { ...state, addresses: action.addresses };
    case SET_FILTERED_ADDRESSES:
      return { ...state, filteredAddresses: action.filteredAddresses};
  }
  return state;
}
export default AddressesReducer;
