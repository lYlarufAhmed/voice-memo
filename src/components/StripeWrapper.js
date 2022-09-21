import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useSelector } from 'react-redux';
import { Paper } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { logger } from '../service';

/*
 This HOC wraps all the pages related to stripe check out
*/

const StripeWrapper = ({ children }) => {
  const merchantId = useSelector(state => state.church.stripe.id);
  const history = useHistory();
  const clientSecret =
    useSelector(state => state.stripe.clientSecret) ||
    new URLSearchParams(window.location.search).get('payment_intent_client_secret');
  useEffect(() => {
    logger.warn('rendering stripeWrapper');
    if (!clientSecret) {
      // redirect to somewhere
      history.push('/giving');
      logger.warn('redirect to somewhere');
    }
  }, [clientSecret, history]);
  const stripePromise = useMemo(() => {
    logger.warn(`returning stripe promise with merchantId: ${merchantId}`);
    return loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY, {
      stripeAccount: merchantId,
    });
  }, [merchantId]);

  const options = useMemo(() => {
    logger.warn(`creating the options for stripe with clientSecret: ${clientSecret}`);
    return { clientSecret, appearance: { theme: 'stripe' } };
  }, [clientSecret]);

  return (
    <Paper
      elevation={1}
      id="stripe-container"
      style={{
        marginTop: '5rem',
        padding: '2rem',
      }}
    >
      <Elements stripe={stripePromise} options={options}>
        {children}
      </Elements>
    </Paper>
  );
};
StripeWrapper.propTypes = {
  children: PropTypes.object.isRequired,
};
export default StripeWrapper;
