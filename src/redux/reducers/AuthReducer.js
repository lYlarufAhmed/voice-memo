import {
  CREATE_USER_CUSTOMER,
  DELETE_CARD,
  GUEST_LOGIN,
  RECEIVE_USER,
  RECEIVE_USER_CUSTOMER,
  UPDATE_USER,
  UPDATE_USER_IMG,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_SUCCESS,
} from 'redux/actions/AuthActions';

const initialState = { cognitoUser: null, user: null, church: null, customer: null, as: 'guest' };

const AuthReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GUEST_LOGIN:
      return { ...state, user: null, cognitoUser: null, as: 'guest' };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        cognitoUser: payload.cognitoUser,
        user: payload.user,
        church: payload.church,
        as: payload.as,
      };

    case RECEIVE_USER:
    case UPDATE_USER:
      return {
        ...state,
        user: payload.user,
      };

    case UPDATE_USER_IMG:
      return {
        ...state,
        user: {
          ...state.user,
          avatar: payload.avatar,
        },
      };

    case RECEIVE_USER_CUSTOMER:
      return {
        ...state,
        customer: payload.customer,
      };

    case CREATE_USER_CUSTOMER:
      // eslint-disable-next-line no-param-reassign
      // state.user.customerID = payload.customerID;
      return {
        ...state,
        user: { ...state.user, customerID: payload.customerID },
      };

    case DELETE_CARD:
      const { auth } = state;
      const { customer } = auth;
      customer.sources = customer.sources.filter(({ id }) => id !== payload.cardID);
      if (customer.default_source === payload.cardID)
        customer.default_source = customer.sources.length ? customer.sources[0].id : null;

      return { ...state, auth: { ...auth, customer } };

    case USER_LOGOUT_SUCCESS:
      return { ...state, user: initialState, church: null };

    default:
      return state;
  }
};

export default AuthReducer;
