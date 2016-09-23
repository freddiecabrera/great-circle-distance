import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { dispatch } from 'redux';
import { Router, Route, browserHistory } from 'react-router';
import store from './store.js';
import App from './containers/App.jsx';
import Addresses from '../imports/api/addresses.js';


Tracker.autorun(() => {
  store.dispatch({
    type: 'SET_ADDRESSES',
    addresses: Addresses.find().fetch(),
  });
});

Meteor.startup(() => {
  render(
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={App} />
      </Router>
    </Provider>,
    document.getElementById('app'));
});
