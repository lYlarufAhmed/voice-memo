import {
  RECEIVE_CHURCH_STATE,
  // UPDATE_CHURCH_STATE,
  // CONNECT_CHURCH_MERCHANT,
} from '../actions/ChurchActions';

const initialState = {};

const ChurchReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_CHURCH_STATE:
      return { ...action.payload.church };
    default:
      return { ...state };
  }
};

export default ChurchReducer;
