import { INPUT_BAR, TOGGLE_CHECK, SET_ADDRESSES, SET_FILTERED_ADDRESSES } from './types.js';
import Addresses from '../../imports/api/addresses.js';
import { Tracker } from 'meteor/tracker';

const inputBarSwitch = inputBar => ({
  type: INPUT_BAR,
  inputBar
});

export const togggleCheck = (addressCheck, latLonCheck) => {
  return dispatch => {
    dispatch(inputBarSwitch(addressCheck));
    dispatch({
      type: TOGGLE_CHECK,
      checks: [addressCheck, latLonCheck]
    });
  }
};

export const filterAddresses = addresses => ({
  type: SET_FILTERED_ADDRESSES,
  filteredAddresses: addresses
});
