import { INITIAL_DATE_RANGE } from 'config/giving-history';
import { api, logger } from 'service';
import moment from 'moment';
import { fetchCustomerStateRequest } from './AuthActions';

export const REQUEST_GIFTS = 'REQUEST_GIFTS';
export const RECEIVE_GIFTS = 'RECEIVE_GIFTS';
export const REQUEST_GIFT_HISTORY = 'REQUEST_GIFT_HISTORY';
export const RECEIVE_GIFT_HISTORY = 'RECEIVE_GIFT_HISTORY';
export const RECEIVE_SUBSCRIPTIONS = 'RECEIVE_SUBSCRIPTIONS';
export const REQUEST_SUBSCRIPTIONS = 'REQUEST_SUBSCRIPTIONS';
export const DATE_RANGE_CHANGED = 'DATE_RANGE_CHANGED';
export const REQUEST_CANCEL_SUBSCRIPTION = 'REQUEST_CANCEL_SUBSCRIPTION';
export const SUCCESS_CANCEL_SUBSCRIPTION = 'SUCCESS_CANCEL_SUBSCRIPTION';

export const changeDateRange = range => ({
  type: DATE_RANGE_CHANGED,
  payload: {
    dateRange: range,
  },
});

export const fetchGiftsRequest = churchID => async dispatch => {
  try {
    dispatch({ type: REQUEST_GIFTS });
    const { gifts } = await api(`/church/${churchID}/gift`);
    const filteredGifts = gifts.filter(g => g.status);
    dispatch({
      type: RECEIVE_GIFTS,
      payload: {
        data: filteredGifts,
      },
    });
    return gifts;
  } catch (error) {
    logger.warn('fetchGiftsRequest action', error);
    dispatch({
      type: RECEIVE_GIFTS,
      payload: {
        data: [],
      },
    });
    return [];
  }
};

export const createSubscriptionsRequest = subObj => async (_, getState) => {
  const {
    auth: {
      church,
      customer: { id },
    },
  } = getState();
  await api(`/payments/church/${church}/customer/${id}/subscription`, 'post', {
    ...subObj,
    metadata: { ...subObj.metadata, churchID: church },
  });
};

export const createPaymentRequest = paymentObj => async (_, getState) => {
  const {
    auth: { customer },
    church: { id: churchID },
  } = getState();

  await api(`/payments/church/${churchID}/customer/${customer.id}/charge`, 'post', {
    ...paymentObj,
    metadata: { ...paymentObj.metadata, churchID },
  });
};

export const fetchGivingHistoryRequest =
  (churchID, from = INITIAL_DATE_RANGE.from, to = INITIAL_DATE_RANGE.to) =>
  async (dispatch, getState) => {
    const {
      gifts,
      auth: { user },
    } = getState();

    if (!user.customerID) dispatch(fetchCustomerStateRequest());

    try {
      dispatch({ type: REQUEST_GIFT_HISTORY });
      const { history } = await api(
        `/giving-history/church/${churchID}/user/${user.id}/from/${from}/to/${to}`,
      );
      let gHistory = gifts.history.filter(item => item.date < from || item.date > to);

      gHistory = gHistory.concat(history).sort((a, b) => b.date - a.date);
      dispatch({
        type: RECEIVE_GIFT_HISTORY,
        payload: {
          history: gHistory,
          from: Math.min(from, gifts.from),
          to: Math.max(to, gifts.to),
        },
      });
      // console.info('gHistory', gHistory);
      return [gHistory];
    } catch (error) {
      logger.warn('fetchGivingHistoryRequest action', error);
      dispatch({
        type: RECEIVE_GIFT_HISTORY,
        payload: {
          history: [],
          from: Math.min(from, gifts.from),
          to: Math.max(to, gifts.to),
        },
      });
      return [[]];
    }
  };

export const fetchRecurringGivingRequest = () => async (dispatch, getState) => {
  const {
    auth: {
      church: churchID,
      user: { customerID },
    },
    gifts,
  } = getState();
  dispatch({ type: REQUEST_SUBSCRIPTIONS });

  const { subscriptions } = await api(`/payments/church/${churchID}/customer/${customerID}/subscription`);
  // console.info(subscriptions);
  const subs = subscriptions.map(
    (
      {
        id,
        latest_invoice: { created, hosted_invoice_url: invoiceUrl, total: totalAmount },
        current_period_end: currentPeriodEnd,
        items,
      }, // console.log(subs);
    ) => ({
      id,
      totalAmount,
      created: new Date(moment.unix(created)).getTime(),
      nextPayment: moment.unix(currentPeriodEnd).format('LL'),
      invoiceUrl,
      subItems: items.data.map(
        ({ plan: { product: prodId, amount, currency, interval_count: intervalCount, interval } }) => ({
          title: (gifts.data.find(g => g.productID === prodId) || { title: 'No Title' }).title,
          amount,
          intervalCount,
          interval,
          currency,
          prodId,
        }),
      ),
    }),
  );
  dispatch({ type: RECEIVE_SUBSCRIPTIONS, payload: { subscriptions, subs } });
  return subscriptions;
};

export const cancelSubscriptionRequest = (churchID, customerID, subsID) => async dispatch => {
  try {
    dispatch({ type: REQUEST_CANCEL_SUBSCRIPTION, payload: { id: subsID } });
    await api(`/payments/church/${churchID}/customer/${customerID}/subscription/${subsID}`, 'delete');
  } catch (e) {
    logger.warn('Failed subscription cancelation', churchID, customerID, subsID);
  }

  dispatch({ type: SUCCESS_CANCEL_SUBSCRIPTION, payload: { id: subsID } });
};

export const createMembershipRequest = async (customerID, source, sourceId, priceId) => {
  const { subscription } = await api(`/payments/merchant/customer/${customerID}/subscription`, 'post', {
    sourceID: sourceId || undefined,
    priceID: priceId,
    source: source || undefined,
  });
  return subscription;
};
