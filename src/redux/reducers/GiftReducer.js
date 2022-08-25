import {
  REQUEST_CANCEL_SUBSCRIPTION,
  SUCCESS_CANCEL_SUBSCRIPTION,
  DATE_RANGE_CHANGED,
  RECEIVE_GIFT_HISTORY,
  RECEIVE_GIFTS,
  RECEIVE_SUBSCRIPTIONS,
  REQUEST_GIFT_HISTORY,
  REQUEST_GIFTS,
  REQUEST_SUBSCRIPTIONS,
} from 'redux/actions/GiftActions';
// import { USER_LOGOUT_SUCCESS } from 'redux/actions/AuthActions';
import { INITIAL_DATE_RANGE } from 'config/giving-history';

const initialState = {
  data: [],
  history: [],
  subs: [],
  from: new Date().getTime(),
  to: new Date().getTime(),
  dateRange: INITIAL_DATE_RANGE.dateRange,
  isLoading: 0,
  isLoaded: 0,
};

const GiftReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_GIFTS:
    case REQUEST_SUBSCRIPTIONS:
    case REQUEST_CANCEL_SUBSCRIPTION:
    case REQUEST_GIFT_HISTORY:
      return { ...state, isLoading: state.isLoading + 1 };

    case RECEIVE_GIFTS:
      return {
        ...state,
        data: state.isLoading > 0 ? action.payload.data : [],
        isLoading: state.isLoading > 0 ? state.isLoading - 1 : 0,
        isLoaded: 1,
      };

    case RECEIVE_GIFT_HISTORY:
      if (state.isLoading > 0) {
        return {
          ...state,
          history: action.payload.history,
          from: action.payload.from,
          to: action.payload.to,
          isLoading: state.isLoading - 1,
        };
      }
      return {
        ...state,
        history: [],
        from: new Date().getTime(),
        to: new Date().getTime(),
        isLoading: 0,
      };
    case RECEIVE_SUBSCRIPTIONS:
      return {
        ...state,
        subscriptions: action.payload.subscriptions,
        subs: action.payload.subs,
        isLoading: state.isLoading - 1,
      };

    case DATE_RANGE_CHANGED:
      return { ...state, dateRange: action.payload.dateRange };
    case SUCCESS_CANCEL_SUBSCRIPTION: {
      const newSubs = state.subs.filter(sub => sub.id !== action.payload.id);
      return { ...state, subs: newSubs, isLoading: 0 };
    }
    default:
      return state;
  }
};

export default GiftReducer;
