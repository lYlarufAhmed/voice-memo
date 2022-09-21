/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import { reducer as formReducer } from 'redux-form';
import gifts from './GiftReducer';
import auth from './AuthReducer';
import church from './ChurchReducer';
import stripe from './StripeReducer';

// Combine all reducers into one root reducer
export default combineReducers({
  gifts,
  auth,
  church,
  stripe,
  form: formReducer,
});
