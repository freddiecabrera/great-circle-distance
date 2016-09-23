import { createStore, compose, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import Reducers from './reducers';

const store = createStore(Reducers, compose(
  applyMiddleware(reduxThunk),
  typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : (f) => f
));

export default store;
