import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Grid, Paper, Typography } from '@material-ui/core';
import { DHeader, Loading } from 'components';
import { deleteCardRequest, fetchCustomerStateRequest } from 'redux/actions/AuthActions';
import {
  createPaymentRequest,
  createSubscriptionsRequest,
  fetchGiftsRequest,
} from 'redux/actions/GiftActions';
import FaithmoIcon from '../../assets/images/default_church.png';

import './style.css';
import GivingForm from './GivingForm';
import CloseImg from '../../assets/images/close-x.png';
import { GivingHistory, UserProfile } from '../index';
import {
  requestPaymentIntentForCharge,
  requestPaymentIntentForSubscription,
} from '../../redux/actions/StripeActions';
import Thanks from '../Signup/Thanks';

class Giving extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      selectedCard: '',
      showThankYou: false,
      error: null,
      deletingCard: false,
    };
  }

  componentDidMount() {
    this.loadInitialData();
  }

  removeError = () => this.setState({ error: null });

  handleChangeSelectedCard = event => {
    this.setState({ selectedCard: event.target.value });
  };

  loadInitialData = () => {
    const { dispatch } = this.props;
    this.setState({ isLoaded: false }, async () => {
      const { churchID, as } = this.props;
      const promises = [dispatch(fetchGiftsRequest(churchID))];
      if (as !== 'guest') promises.push(dispatch(fetchCustomerStateRequest()));
      const initialStates = {};
      try {
        const [, customer] = await Promise.all(promises);
        if (customer && !customer.deleted) {
          // initialStates.cards = customer.sources ? customer.sources : [];
          initialStates.selectedCard = customer.default_source || '';
          initialStates.plan = customer.subscription ? customer.subscription.plan.id : null;
        }
      } catch (error) {
        // continue regardless of error
        this.setState({ error });
      }
      this.setState({ isLoaded: true, ...initialStates });
    });
  };

  toHistory = () => {
    const { history, location } = this.props;
    history.push(`/dashboard/history`, { from: location.pathname });
  };

  toSignup = () => {
    const { history, location } = this.props;
    history.push(`/signup`, { from: location.pathname });
  };

  handleSubmit = async giving => {
    const { dispatch, history, location } = this.props;
    const { isRecurring, frequency } = giving;

    // TODO: steps for creating a payment
    //  2. get payment intent data
    //  3. create payment intent
    //  4. if status requires_confirmation confirm that
    const prices = giving.givings
      // .filter(g => !g.isRecurring)
      .map(({ amount, productID }) => {
        if (isRecurring)
          return {
            amount: Math.floor(parseFloat(amount) * 100),
            productID,
          };
        return {
          type: 'gift',
          amount: Math.floor(parseFloat(amount) * 100),
          productID,
        };
      });
    const paymentObj = { prices, metadata: giving.card.metadata };
    if (isRecurring) {
      paymentObj.interval = frequency === 'bi-week' ? 'week' : frequency;
      // calculate the interval here
      paymentObj.intervalCount = frequency === 'bi-week' ? 2 : 1;
    }
    if (giving.selectedCard) {
      paymentObj.sourceID = giving.selectedCard;
      try {
        if (isRecurring) await dispatch(createSubscriptionsRequest(paymentObj));
        else await dispatch(createPaymentRequest(paymentObj));
        this.setState({ showThankYou: true, error: null });
      } catch (e) {
        this.setState({ error: e });
      }
    } else {
      // console.log('no card selected');
      // create payment intent
      // this.setSubmitting();
      if (isRecurring) await dispatch(requestPaymentIntentForSubscription(paymentObj));
      else await dispatch(requestPaymentIntentForCharge(paymentObj));
      history.push('/checkout', { from: location.pathname });
      // this.setState({ renderPayment: true, clientSecret });
    }

    // const selectedCard = giving.selectedCard || null;
    // let card;
    // const paymentObj = {};
    // if (!selectedCard) {
    //   card = {
    //     ...giving.card,
    //     exp_month: giving.card.exp_month ? parseInt(giving.card.exp_month, 10) : undefined,
    //     exp_year: giving.card.exp_year ? parseInt(giving.card.exp_year, 10) : undefined,
    //     cvc: giving.card.cvc || undefined,
    //     address_line2: giving.card.address_line2 || undefined,
    //   };
    // }
    //
    // if (isRecurring) {
    //   paymentObj.interval = frequency === 'bi-week' ? 'week' : frequency;
    //   // calculate the interval here
    //   paymentObj.intervalCount = frequency === 'bi-week' ? 2 : 1;
    // }
    //

    // this.setSubmitting();
    // if (paymentObj.prices.length) {
    //   if (selectedCard) paymentObj.sourceID = selectedCard;
    //   else paymentObj.source = card;
    //   try {
    //     if (isRecurring) await dispatch(createSubscriptionsRequest(paymentObj, 0));
    //     else await dispatch(createPaymentRequest(paymentObj));
    //     this.setState({ showThankYou: true, error: null });
    //   } catch (e) {
    //     this.setState({ error: e });
    //   } finally {
    //     this.setState({ isSubmitting: false });
    //   }
    // }
  };

  deleteCard = async cardID => {
    const { churchID, user, dispatch } = this.props;
    this.setState({ deletingCard: true });
    await dispatch(deleteCardRequest(churchID, user?.customerID, cardID));

    this.setState({ deletingCard: false });
  };

  renderSteps = () => {
    const { error, selectedCard, deletingCard } = this.state;
    const { gifts, churchTitle, churchLogo, cards } = this.props;

    return (
      <Grid
        container
        direction="column"
        style={{ gap: '2rem', paddingLeft: '1rem' }}
        justifyContent="space-around"
      >
        {!!error && (
          <div className="Toast__toast_">
            <span>{error.message}</span>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <span role="button" tabIndex={0} className="Toast__toastClose" onClick={this.removeError} />
          </div>
        )}
        <GivingForm
          id="GivingForm"
          // onSubmit={this.goToPayment}
          selectedCard={selectedCard}
          gifts={gifts.data}
          cards={cards}
          deletingCard={deletingCard}
          handleSubmit={this.handleSubmit}
          handleDeleteCard={this.deleteCard}
          churchName={churchTitle}
          churchLogo={churchLogo}
        />
      </Grid>
    );
  };

  render() {
    const { isLoaded, showThankYou } = this.state;
    const { gifts, as, history, location, churchTitle, churchLogo } = this.props;
    const routes = [
      { path: '/dashboard/profile', exact: false, name: 'Profile', component: UserProfile },
      // { path: '/dashboard/giving', exact: false, name: 'Giving', component: Giving },
      { path: '/dashboard/history', exact: false, name: 'Giving History', component: GivingHistory },
    ];
    return (
      <>
        {as === 'user' && (
          <div className="app-header-spacer">
            <DHeader headers={routes.map(r => ({ path: r.path, name: r.name }))} />
          </div>
        )}
        <Paper
          elevation={1}
          id="giving-container"
          style={{
            marginTop: as === 'guest' && '4rem',
          }}
        >
          <>
            {isLoaded && as === 'guest' && (
              <div
                className="close-button-container"
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <div
                  role="button"
                  className="close-button"
                  onClick={() => history.push('/login', { from: location.pathname })}
                  tabIndex={0}
                >
                  <img
                    src={CloseImg}
                    alt="Back"
                    style={{ width: '24%', height: '34%', marginLeft: '1rem', marginTop: '1rem' }}
                  />
                </div>
                <div
                  className="church-brand"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '.7rem 2rem 0 0',
                  }}
                >
                  <Typography variant="h6">{churchTitle}</Typography>
                  <img alt="FaithmoIcon" height="70" width="70" src={churchLogo || FaithmoIcon} />
                </div>
              </div>
            )}

            <Grid
              container
              direction="column"
              justifyContent="center"
              id="giving-grid"
              style={{
                gap: '4rem',
                padding: isLoaded && !gifts.isLoading && '1.7rem 1.5rem',
              }}
            >
              {showThankYou ? (
                <div className="d-flex flex-column align-items-end">
                  <div
                    role="button"
                    onClick={() => history.push('/login', { from: location.pathname })}
                    tabIndex={0}
                  >
                    <img
                      src={CloseImg}
                      alt="Back"
                      style={{ marginLeft: '1rem', marginTop: '1rem', height: '40px', widht: '40px' }}
                    />
                  </div>
                  <Thanks
                    hidden={!showThankYou}
                    content={`Your gift has been received! ${
                      as === 'guest'
                        ? 'If you would like to subscribe to this church, click the button below to continue sign-up.'
                        : 'Click the button below to be taken to your giving history page.'
                    }`}
                    header="Thank You!"
                    buttonText={as === 'guest' ? 'Sign Up' : 'Giving History'}
                    handler={as === 'guest' ? this.toSignup : this.toHistory}
                  />
                </div>
              ) : isLoaded && !gifts.isLoading ? (
                <>
                  <Grid item>
                    <Typography variant="h4">Let&apos;s Give</Typography>
                  </Grid>
                  <Grid item>{this.renderSteps()}</Grid>
                </>
              ) : (
                <Loading />
              )}
            </Grid>
          </>
        </Paper>
      </>
    );
  }
}

Giving.defaultProps = {
  user: {},
  churchLogo: '',
  cards: [],
};
Giving.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string,
    email: PropTypes.string,
    customerID: PropTypes.string,
    profile: PropTypes.object,
    contacts: PropTypes.object,
    avatar: PropTypes.string,
  }),
  // .isRequired,
  gifts: PropTypes.shape({
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        churchID: PropTypes.string.isRequired,
        created: PropTypes.number.isRequired,
        productID: PropTypes.string.isRequired,
        status: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
      }),
    ),
    isLoading: PropTypes.number.isRequired,
  }).isRequired,
  as: PropTypes.string.isRequired,
  churchID: PropTypes.string.isRequired,
  churchTitle: PropTypes.string.isRequired,
  churchLogo: PropTypes.string,
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  ),
};

const mapStateToProps = ({
  auth,
  church: {
    id: churchID,
    title,
    avatar,
    stripe: { id: merchantID },
  },
  gifts,
}) => {
  let user;
  let customer;
  const { as } = auth;
  if (as === 'user') {
    user = auth.user;
    customer = auth.customer;
  }
  let cards = [];
  if (customer) {
    cards = customer.payment_methods;
    // if (customer.payment_methods.length) cards = [...cards, ...customer.payment_methods];
  }
  return {
    gifts,
    user,
    customer,
    as,
    churchID,
    cards,
    churchTitle: title,
    churchLogo: avatar,
    merchantID,
  };
};

export default withRouter(connect(mapStateToProps)(Giving));
