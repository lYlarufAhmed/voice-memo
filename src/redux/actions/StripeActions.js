import { api } from '../../service';
import { createCustomerRequest, registerUserRequestAsGuest } from './AuthActions';
import logger from '../../service/logger';

export const REQUEST_SECRET_KEY = 'REQUEST_SECRET_KEY';
export const RECEIVE_SECRET_KEY = 'RECEIVE_SECRET_KEY';

export const requestPaymentIntentForCharge = paymentObj => async (dispatch, getState) => {
  const {
    auth: { customer, as },
    church: { id: churchID },
  } = getState();
  let email;
  let customerId;
  dispatch({ type: REQUEST_SECRET_KEY });
  logger.warn(paymentObj);
  if (as === 'guest') {
    const { first_name: firstName, last_name: lastName } = paymentObj.metadata;
    email = paymentObj.metadata.email;

    let res = await api(`/guest/user/email/${email}`);
    if (!res.user) {
      await dispatch(registerUserRequestAsGuest({ firstName, lastName, email }));
      res = await api(`/guest/user/email/${email}`);
    }
    const { user } = res;

    // eslint-disable-next-line prefer-const
    let { customerID: cusID, churches } = user;
    if (churches && !churches.includes(churchID)) throw Error('User is not subscribed to this church!');
    if (!cusID) {
      const { customerID } = await dispatch(
        createCustomerRequest({ name: `${firstName} ${lastName}`, email }),
      );
      cusID = customerID;
    }
    customerId = cusID;
  } else {
    customerId = customer.id;
  }
  const { clientSecret } = await api(
    `/payments/church/${churchID}/customer/${customerId}/charge/create-intent`,
    'post',
    { ...paymentObj, metadata: { ...paymentObj.metadata, churchID } },
  );
  dispatch({ type: RECEIVE_SECRET_KEY, payload: { clientSecret } });
  return clientSecret;
};

export const requestPaymentIntentForSubscription = paymentObj => async (dispatch, getState) => {
  const {
    auth: {
      customer: { id: customerId },
    },
    church: { id: churchID },
  } = getState();

  const { clientSecret } = await api(
    `/payments/church/${churchID}/customer/${customerId}/subscription/create-intent`,
    'post',
    { ...paymentObj, metadata: { ...paymentObj.metadata, churchID } },
  );
  dispatch({ type: RECEIVE_SECRET_KEY, payload: { clientSecret } });
  return clientSecret;
};
