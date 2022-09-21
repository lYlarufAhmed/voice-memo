/**
 * Main store function
 */
import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { storage } from '../service';

export const configureStore = (initialState = {}) => {
  // Middleware and store enhancers
  const enhancers = [applyMiddleware(thunk)];

  if (process.env.NODE_ENV === 'development') {
    // Enable DevTools only when rendering during development
    enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f);
  }
  return createStore(rootReducer, initialState, compose(...enhancers));
};
let initialState = {};
if (process.env.NODE_ENV === 'development') {
  const data = storage.getItem('unverified_faithmo_signup_data');
  if (data) {
    initialState = {
      form: { RegisterChurchForm: { values: data } },
    };
  }
}
export const store = configureStore(initialState);

export default { configureStore };
