import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import Amplify, { Hub } from 'aws-amplify';
import { COGNITO_CONFIG } from 'config/amplify';
import Container from '@material-ui/core/Container';
import { logger, storage } from 'service';
import { Loading } from 'components';
import { currentUserInfo, logout, registerUserRequest } from 'redux/actions/AuthActions';
// import { fetchGiftsRequest, fetchGivingHistoryRequest } from 'redux/actions/GiftActions';
import { privateRoutes, publicRoutes } from './routes';
import { fetchChurchRequest } from './redux/actions/ChurchActions';
import Footer from './components/Footer';

if (process.env.NODE_ENV === 'production') {
  Amplify.Logger.LOG_LEVEL = 'ERROR';
} else {
  Amplify.Logger.LOG_LEVEL = 'DEBUG';
}

Amplify.configure({
  Auth: COGNITO_CONFIG,
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      error: null,
    };
  }

  componentDidMount() {
    const { location, dispatch } = this.props;
    const subdomain = window.location.host.split('.')[0];
    logger.warn('setting church');
    this.setState({ isLoaded: false }, async () => {
      await dispatch(fetchChurchRequest(subdomain, null));
      Hub.listen('faithmo_auth', this.faithmoAuthListener);
      try {
        await dispatch(currentUserInfo());
      } catch (e) {
        Hub.dispatch('faithmo_auth', { data: { e }, event: 'signout' });
      }
      const isPrivate = privateRoutes.some(routeProps => {
        if (routeProps.exact) return location.pathname === routeProps.path;
        return location.pathname.startsWith(routeProps.path);
      });

      if (isPrivate) {
        Hub.dispatch('faithmo_auth', { event: 'signin' });
      } else {
        this.setState({ isLoaded: true });
      }
    });
  }

  componentWillUnmount() {
    Hub.remove('faithmo_auth', this.faithmoAuthListener);
  }

  _signout = async ({ error }) => {
    const { dispatch, history, location } = this.props;
    this.setState({
      isLoaded: false,
      error,
    });
    try {
      await dispatch(logout());
    } catch (e) {
      logger.warn(e);
      this.setState({ error: e });
    }
    history.push('/login', {
      from: location.pathname,
    });
    this.setState({ isLoaded: true });
  };

  _signin = async ({ from, to }) => {
    const { history, dispatch } = this.props;
    try {
      this.setState({ isLoaded: false });
      await dispatch(currentUserInfo());
      this.setState({ isLoaded: true });
      if (to) history.replace(to, { from });
    } catch (error) {
      Hub.dispatch('faithmo_auth', {
        event: 'signout',
        data: { error },
      });
    }
  };

  _signup = async ({ email, signUpData }) => {
    const { dispatch } = this.props;
    if (!email || !signUpData) {
      Hub.dispatch('faithmo_auth', {
        event: 'signout',
        data: { error: 'invalid upload. email or signUp data is empty', email, signUpData },
      });
      return;
    }
    try {
      this.setState({ isLoaded: false });
      if (signUpData && signUpData.firstName && signUpData.lastName && signUpData.email) {
        await dispatch(registerUserRequest(signUpData));
        storage.removeItem(`unverified_faithmo_signup_data[${email}]`);
      } else if (signUpData) {
        storage.removeItem(`unverified_faithmo_signup_data[${email}]`);
      }
      Hub.dispatch('faithmo_auth', {
        event: 'signin',
        data: { from: '/signup', to: '/dashboard' },
      });
    } catch (error) {
      if (error.response && error.response.data) {
        const errBody = error.response.data;
        if (errBody.code && errBody.code === 'invalid') {
          storage.removeItem(`unverified_faithmo_signup_data[${email}]`);
        }
      }
      Hub.dispatch('faithmo_auth', {
        event: 'signout',
        data: { error },
      });
    }
  };

  faithmoAuthListener = ({ channel, payload: { event, data } }) => {
    const payloadData = data || {};

    if (payloadData.error) logger.warn(channel, event, payloadData);
    else logger.debug(channel, event, payloadData);

    this.removeError();
    switch (event) {
      case 'signin':
        this._signin(payloadData);
        break;
      case 'signup':
        this._signup(payloadData);
        break;
      case 'signout':
        this._signout(payloadData);
        break;
      default:
        break;
    }
  };

  removeError = () => {
    this.setState({ error: null });
  };

  render() {
    const { isLoaded, error } = this.state;

    return (
      <Container
        maxWidth="xl"
        disableGutters
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        {!!error && (
          <div className="Toast__toast_">
            <span>{error.message}</span>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <span role="button" tabIndex={0} className="Toast__toastClose" onClick={this.removeError} />
          </div>
        )}
        {!isLoaded ? (
          <div className="app-loading-container">
            <Loading size={48} thickness={2} />
          </div>
        ) : (
          <>
            <Helmet
              title="Pray, give and stay up to date!"
              titleTemplate="%s - FAITHMO"
              meta={[
                { charset: 'utf-8' },
                {
                  'http-equiv': 'X-UA-Compatible',
                  content: 'IE=edge',
                },
                {
                  name: 'viewport',
                  content: 'width=device-width, initial-scale=1, minimum-scale=1, shrink-to-fit=no',
                },
              ]}
            />
            <Switch>
              {publicRoutes.map(({ path, exact, component, redirect }) => {
                if (component)
                  return (
                    <Route
                      key={`${path}-${exact ? 1 : 0}`}
                      path={path}
                      exact={!!exact}
                      component={component}
                    />
                  );
                if (redirect)
                  return (
                    <Route key={`${path}-${exact ? 1 : 0}`} path={path} exact={!!exact}>
                      <Redirect to={redirect} />
                    </Route>
                  );
                return null;
              })}
              <Route
                path="/.well-known/apple-developer-merchantid-domain-association"
                onEnter={() => window.location.reload()}
              />
              {privateRoutes.map(({ component: PageComponent, ...rest }) => (
                <Route key={`${rest.path}-${rest.exact ? 1 : 0}`} {...rest}>
                  <PageComponent />
                </Route>
              ))}
              <Redirect to="/" />
            </Switch>
          </>
        )}
        <Footer />
      </Container>
    );
  }
}

App.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default withRouter(connect()(App));
