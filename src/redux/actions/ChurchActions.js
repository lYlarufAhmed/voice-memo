import { api } from 'service';
import logger from '../../service/logger';

export const RECEIVE_CHURCH_STATE = 'RECEIVE_CHURCH_STATE';
export const UPDATE_CHURCH_STATE = 'UPDATE_CHURCH_STATE';
export const CONNECT_CHURCH_MERCHANT = 'CONNECT_CHURCH_MERCHANT';
export const connectStripeAccount = (churchID, code) => dispatch =>
  new Promise((resolve, reject) => {
    api(`/payments/merchant/church/${churchID}/connect`, 'post', {
      code,
    })
      .then(async ({ stripe }) => {
        dispatch({
          type: CONNECT_CHURCH_MERCHANT,
          payload: { stripe },
        });
        resolve();
      })
      .catch(error => {
        reject(error);
      });
  });

export const fetchChurchStateSuccess = church => ({
  type: RECEIVE_CHURCH_STATE,
  payload: { church },
});

export const fetchChurchRequest =
  (subdomain = null, churchID = null) =>
  async dispatch => {
    /*
     * get a church by subdomain or churchID
     * */
    logger.warn('getting church', subdomain, churchID);
    const { churches } = await api(`/church`);
    const church = churches.find(ch => (subdomain ? ch.subdomain === subdomain : ch.id === churchID));
    await dispatch(fetchChurchStateSuccess(church));
    return { church };
  };

export const updateChurchRequest = (churchID, editChurch) => async dispatch => {
  const uChurch = {
    contacts: editChurch.contacts,
    socialMedia: editChurch.socialMedia,
    title: editChurch.title,
    desc: editChurch.desc,
    pastor: editChurch.pastor,
  };

  let updateCustomer = Promise.resolve();
  if (uChurch.customerID) {
    updateCustomer = api(`/payments/merchant/customer/${uChurch.customerID}`, 'put', {
      name: uChurch.title,
      phone: uChurch.contacts.phoneNumber,
      email: uChurch.contacts.email,
    });
  }

  await Promise.all([updateCustomer, api(`/church/${churchID}`, 'put', uChurch)]);

  dispatch({
    type: UPDATE_CHURCH_STATE,
    payload: {
      church: uChurch,
      customer: {
        name: uChurch.title,
        phone: uChurch.contacts.phoneNumber,
        email: uChurch.contacts.email,
      },
      // customer: res && res.customer ? res.customer : {}
    },
  });
};

export const cancelMembershipRequest = (customerID, subscriptionId) =>
  api(`/payments/merchant/customer/${customerID}/subscription/${subscriptionId}`, 'delete');
