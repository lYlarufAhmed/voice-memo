import React, { useState } from 'react';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { withRouter } from 'react-router-dom';
import { Button, Grid } from '@material-ui/core';
import StripeWrapper from '../../components/StripeWrapper';
import { Loading } from '../../components';

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  // const clientSecret = useSelector(state => state.stripe.clientSecret);

  const handleSubmit = async e => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error: err } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `http://${window.location.host}/feedback`,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (err.type === 'card_error' || err.type === 'validation_error') {
      setError(error.message);
    } else {
      setError('An unexpected error occurred.');
    }

    setIsLoading(false);
  };

  return (
    <>
      {!!error && (
        <div className="Toast__toast_">
          <span>{error.message}</span>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <span role="button" tabIndex={0} className="Toast__toastClose" onClick={() => setError(null)} />
        </div>
      )}
      <Grid
        container
        direction="column"
        component="form"
        id="payment-form"
        onSubmit={handleSubmit}
        style={{ gap: '3rem' }}
      >
        {/* <form id="payment-form" > */}
        <Grid item xs={12}>
          <PaymentElement
            id="payment-element"
            options={{
              wallets: {
                applePay: 'auto',
                googlePay: 'auto',
              },
            }}
            onChange={({ complete }) => {
              setIsValid(complete);
            }}
          />
        </Grid>

        {/* <button type="submit" disabled={!isValid || isLoading || !stripe || !elements} id="submit"> */}
        {/*  <span id="button-text">{isLoading ? <Loading /> : 'Pay now'}</span> */}
        {/* </button> */}
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          {isLoading ? (
            <div style={{ position: 'relative', height: 56, width: '100%' }}>
              <Loading />
            </div>
          ) : (
            <Grid item xs={12}>
              <Button
                style={{ backgroundColor: 'greenyellow' }}
                type="submit"
                className="button medium"
                disabled={!isValid || isLoading || !stripe || !elements}
                id="submit"
              >
                Give Now
              </Button>
            </Grid>
          )}
        </Grid>
        {/* Show any error or success messages */}
        {/* </form> */}
      </Grid>
    </>
  );
}

export default withRouter(function Checkout() {
  return (
    <StripeWrapper>
      <CheckoutForm />
    </StripeWrapper>
  );
});
