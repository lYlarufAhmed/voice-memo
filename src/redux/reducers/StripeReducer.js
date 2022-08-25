import { RECEIVE_SECRET_KEY, REQUEST_SECRET_KEY } from '../actions/StripeActions';

const initialState = {
  clientSecret: null,
  isLoading: null,
};

export default function StripeReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case REQUEST_SECRET_KEY:
      return { clientSecret: null, isLoading: true };
    case RECEIVE_SECRET_KEY:
      return { clientSecret: payload.clientSecret, isLoading: false };
    default:
      return JSON.parse(JSON.stringify(state));
  }
}
