import React, { useEffect, useState } from 'react';
import CloseImg from 'assets/images/close-x.png';
import { useHistory, useLocation, withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useStripe } from '@stripe/react-stripe-js';
import PropTypes from 'prop-types';
import StripeWrapper from '../../components/StripeWrapper';
import { Loading } from '../../components';
import { logger } from '../../service';
import Thanks from '../Signup/Thanks';

const StripeFeedback = ({ toSignUp, toHistory, toGiving, toLogin }) => {
  const stripe = useStripe();
  const as = useSelector(state => state.auth.as);
  const [content, setContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [header, setHeader] = useState('');

  const [buttonText, setButtonText] = useState(null);

  const [status, setStatus] = useState('');
  useEffect(() => {
    setIsLoading(true);
    if (!stripe) {
      return;
    }
    const clientSecret = new URLSearchParams(window.location.search).get('payment_intent_client_secret');
    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      logger.warn(paymentIntent);
      setStatus(paymentIntent.status);
      switch (paymentIntent.status) {
        case 'succeeded':
          setContent(
            `Your gift has been received! ${
              as === 'guest'
                ? 'If you would like to subscribe to this church, click the button below to continue sign-up.'
                : 'Click the button below to be taken to your giving history page.'
            }`,
          );
          setHeader('Thank You!');
          setButtonText(as === 'guest' ? 'Sign Up' : 'Giving History');
          break;
        case 'processing':
          setContent('Your payment is being processed.');
          setHeader('Wait!');
          setButtonText('Give more');
          break;
        case 'requires_payment_method':
          setContent('Your payment was not successful, please try again.');
          setHeader('Failed!');
          setButtonText('Try Again');
          break;
        default:
          setContent('Something went wrong.');
          setHeader('Opps!');
          setButtonText('Try Again');
          break;
      }
      setIsLoading(false);
    });
  }, [as, stripe, toGiving, toHistory, toSignUp]);

  return isLoading ? (
    <div style={{ position: 'relative', height: 56, width: '100%' }}>
      <Loading />
    </div>
  ) : (
    <>
      <div role="button" className="close-button" onClick={toLogin} tabIndex={0}>
        <img src={CloseImg} alt="Back" style={{ width: '3rem', height: '3rem' }} />
      </div>
      <Thanks
        hidden={false}
        content={content}
        header={header}
        buttonText={buttonText}
        handler={status === 'succeeded' ? (as === 'guest' ? toSignUp : toHistory) : toGiving}
      />
    </>
  );
};

StripeFeedback.propTypes = {
  toSignUp: PropTypes.func.isRequired,
  toHistory: PropTypes.func.isRequired,
  toGiving: PropTypes.func.isRequired,
  toLogin: PropTypes.func.isRequired,
};

export default withRouter(function Feedback() {
  const history = useHistory();
  const location = useLocation();
  const toSignUp = () => {
    logger.warn('redirecting to signup');
    history.push(`/signup`, { from: location.pathname });
  };
  const toHistory = () => {
    history.push(`/dashboard/history`, { from: location.pathname });
  };
  const toGiving = () => {
    history.push(`/giving`, { from: location.pathname });
  };
  const toLogin = () => {
    history.push(`/login`, { from: location.pathname });
  };

  return (
    <StripeWrapper>
      <StripeFeedback toHistory={toHistory} toGiving={toGiving} toLogin={toLogin} toSignUp={toSignUp} />
    </StripeWrapper>
  );
});
