import React from 'react';
import { Auth } from 'aws-amplify';
import { SignIn } from 'aws-amplify-react';
import { withRouter } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import Loading from 'components/Loading';
import { TextField } from 'components/MDFormControls';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AuthWrapper from './wrapper';
import { GUEST_LOGIN } from '../../redux/actions/AuthActions';
import logger from '../../service/logger';

const INITIAL_STATE = {
  isSubmitting: false,
  email: undefined,
  password: undefined,
  invalids: {},
  error: null,
};

class FaithmoSignIn extends SignIn {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };

    this._isMounted = false;
  }

  componentDidMount() {
    if (super.componentDidMount) {
      super.componentDidMount();
    }
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidUpdate(prevProps) {
    const { authState } = this.props;
    if (prevProps.authState !== authState) {
      this.setState({ ...INITIAL_STATE });
    }
  }

  handleInputBlur = event => {
    if (!event.target || !event.target.name) return;
    if (this.state[event.target.name] === undefined) this.setState({ [event.target.name]: '' });
  };

  handleInputChange = event => {
    const { invalids } = this.state;
    if (event.target.name !== 'password') {
      // eslint-disable-next-line no-param-reassign
      event.target.value = event.target.value.trim();
    }
    this.setState({
      [event.target.name]: event.target.value,
      invalids: { ...invalids, [event.target.name]: false },
    });
    if (
      event.target.name === 'firstName' ||
      event.target.name === 'lastName' ||
      event.target.name === 'churchIndex'
    )
      return;
    super.handleInputChange(event);
  };

  validation = keys => {
    if (keys.find(key => !this.state[key])) {
      const uState = keys.reduce((obj, key) => ({ ...obj, [key]: this.state[key] || '' }), {});
      this.setState(uState);
      return false;
    }

    const invalids = {};
    // if (keys.includes('email') && !EMAIL_REGEXP.test(this.state.email)) invalids.email = true;
    // if (keys.includes('password') && !PASSWORD_REGEXP.test(this.state.password)) invalids.password = true;
    if (Object.keys(invalids).length > 0) {
      this.setState({ invalids });
      return false;
    }
    return true;
  };

  signIn = async event => {
    event.persist();
    // const { history, location } = this.props;
    if (!Auth || typeof Auth.signIn !== 'function') {
      throw new Error('No Auth module found, please ensure @aws-amplify/auth is imported');
    }

    if (!this.validation(['email', 'password'])) return;

    this.setState({ isSubmitting: true }, async () => {
      try {
        // this.setState(prev => ({ ...prev, email: prev.email.toLowerCase() }));
        this.setState(prev => ({ ...prev, email: prev.email }));
        await super.signIn(event);
      } catch (error) {
        this.setState({ error });
      }

      setTimeout(() => {
        if (this._isMounted) this.setState({ isSubmitting: false });
      }, 500);
      // history.push('/', { from: location.pathname });
    });
  };

  removeError = () => {
    this.setState({ error: null });
  };

  goSignup = () => {
    const { history, location } = this.props;
    this.removeError();
    logger.warn('redirecting to signup');
    history.push('/signup', { from: location.pathname });
  };

  goAsaGuest = async event => {
    event.persist();
    const { dispatch, history } = this.props;
    if (!Auth || typeof Auth.signIn !== 'function') {
      throw new Error('No Auth module found, please ensure @aws-amplify/auth is imported');
    }
    // const { dispatch, history } = this.props;
    this.setState({ isSubmitting: true }, async () => {
      // await Auth.signIn(process.env.REACT_APP_GUEST_EMAIL, process.env.REACT_APP_GUEST_PASSWORD);
      // logger.warn('guest login');
      dispatch({ type: GUEST_LOGIN });
      // // await Auth.userSession()
      this.removeError();
      history.push('/giving');
      setTimeout(() => {
        if (this._isMounted) this.setState({ isSubmitting: false });
      }, 500);
    });
  };

  // eslint-disable-next-line no-unused-vars
  showComponent(theme) {
    const { isSubmitting, email, password, invalids, error } = this.state;

    return (
      <AuthWrapper>
        {!!error && (
          <div className="Toast__toast_">
            <span>{error.message}</span>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <span role="button" tabIndex={0} className="Toast__toastClose" onClick={this.removeError} />
          </div>
        )}
        <div className="Form__formContainer">
          <div className="Form__formSection">
            <Grid container spacing={2} style={{ gap: '2rem' }} justifyContent="flex-start">
              <Grid item xs={12} className="Section__sectionHeader">
                <span className="Section__sectionHeaderContent">Login</span>
              </Grid>
              <Grid item xs={12} className="Section__sectionBody">
                <Grid container style={{ gap: '2rem' }}>
                  <Grid item xs={12}>
                    <TextField
                      type="text"
                      label="Email"
                      required
                      value={email}
                      onChange={this.handleInputChange}
                      onBlur={this.handleInputBlur}
                      input={{
                        id: 'email',
                        key: 'email',
                        name: 'email',
                        autoFocus: true,
                      }}
                      meta={{
                        error: !email ? 'Email is Required' : invalids.email ? 'Invalid Email' : '',
                        touched: email !== undefined,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type="password"
                      label="Password"
                      required
                      value={password}
                      onChange={this.handleInputChange}
                      onBlur={this.handleInputBlur}
                      input={{
                        id: 'password',
                        key: 'password',
                        name: 'password',
                      }}
                      meta={{
                        error: !password
                          ? 'Password is Required'
                          : invalids.password
                          ? 'Invalid Password'
                          : '',
                        touched: password !== undefined,
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container direction="column" alignItems="flex-end">
                  {isSubmitting ? (
                    <div style={{ position: 'relative', height: 56, width: '100%', alignSelf: 'center' }}>
                      <Loading />
                    </div>
                  ) : (
                    <button type="button" className="button medium darkblue" onClick={this.signIn}>
                      Login
                    </button>
                  )}

                  <span role="button" onClick={() => super.changeState('forgotPassword')} tabIndex={0}>
                    Forgot your password?
                  </span>
                </Grid>
              </Grid>
            </Grid>
          </div>
          {!isSubmitting && (
            <div className="Form__buttonsContainer">
              <p style={{ fontWeight: 'bold', marginBottom: '2rem' }}>Not a member yet?</p>
              <button className="button lightgreen medium" type="button" onClick={this.goSignup}>
                Sign up
              </button>
              <p style={{ margin: '1rem' }}>or</p>
              <button className="button neutral bg-white medium" type="button" onClick={this.goAsaGuest}>
                Continue as Guest
              </button>
            </div>
          )}
        </div>
      </AuthWrapper>
    );
  }
}

FaithmoSignIn.propTypes = {
  history: PropTypes.object.isRequired,
  // location: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};
export default withRouter(connect()(FaithmoSignIn));
