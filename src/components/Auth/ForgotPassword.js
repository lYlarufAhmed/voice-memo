import React from 'react';
import { ForgotPassword } from 'aws-amplify-react';
import { Auth } from 'aws-amplify';
import Grid from '@material-ui/core/Grid';
import Loading from 'components/Loading';
import TextField from 'components/MDFormControls/TextField';
import { EMAIL_REGEXP, PASSWORD_REGEXP, CODE_REGEXP } from 'config/regexrs';
import { logger } from 'service';
import CloseImg from 'assets/images/close-x.png';
import AuthWrapper from './wrapper';

const INITIAL_STATE = {
  isSubmitting: false,
  code: undefined,
  email: undefined,
  password: undefined,
  invalids: {
    email: false,
    password: false,
    code: false,
  },
  delivery: undefined,
};

class FaithmoForgotPassword extends ForgotPassword {
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
    super.handleInputChange(event);
  };

  validation = keys => {
    if (keys.find(key => !this.state[key])) {
      const uState = keys.reduce((obj, key) => ({ ...obj, [key]: this.state[key] || '' }), {});
      this.setState(uState);
      return false;
    }

    const invalids = {};
    if (keys.includes('email') && !EMAIL_REGEXP.test(this.state.email)) invalids.email = true;
    if (keys.includes('password') && !PASSWORD_REGEXP.test(this.state.password)) invalids.password = true;
    if (keys.includes('code') && !CODE_REGEXP.test(this.state.code)) invalids.code = true;
    if (Object.keys(invalids).length > 0) {
      this.setState({ invalids });
      return false;
    }
    return true;
  };

  send = () => {
    if (!Auth || typeof Auth.forgotPassword !== 'function') {
      throw new Error('No Auth module found, please ensure @aws-amplify/auth is imported');
    }

    if (!this.validation(['email'])) return;

    this.setState({ isSubmitting: true }, async () => {
      const { email } = this.state;

      try {
        const data = await Auth.forgotPassword(email);
        logger.debug(data);
        if (this._isMounted) this.setState({ delivery: data.CodeDeliveryDetails, isSubmitting: false });
      } catch (err) {
        if (this._isMounted) this.setState({ isSubmitting: false });
        this.error(err);
      }
    });
  };

  submit = () => {
    if (!Auth || typeof Auth.forgotPasswordSubmit !== 'function') {
      throw new Error('No Auth module found, please ensure @aws-amplify/auth is imported');
    }

    if (!this.validation(['code', 'password'])) return;

    this.setState({ isSubmitting: true }, async () => {
      const { authData } = this.props;
      const { code, password } = this.state;
      const username = this.getUsernameFromInput() || authData.username;

      try {
        const data = await Auth.forgotPasswordSubmit(username, code, password);
        logger.debug(data);
        if (this._isMounted) this.setState({ delivery: null, isSubmitting: false });
        this.changeState('signIn');
      } catch (err) {
        if (this._isMounted) this.setState({ isSubmitting: false });
        this.error(err);
      }
    });
  };

  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  showComponent(_theme) {
    const { delivery, code, password, email, invalids, isSubmitting } = this.state;
    const { authData } = this.props;

    const isSubmitView = delivery || (authData && authData.username);

    return (
      <AuthWrapper>
        <div className="Form__formContainer">
          <div className="close-button-container">
            {!isSubmitting && (
              <div
                role="button"
                className="close-button"
                onClick={() => this.changeState('signIn')}
                tabIndex={0}
              >
                <img src={CloseImg} alt="Back" style={{ width: '100%', height: '100%' }} />
              </div>
            )}
          </div>
          <div className="Form__formSection">
            <Grid container spacing={2}>
              <Grid item xs={12} className="Section__sectionHeader">
                <span className="Section__sectionHeaderContent">Reset your password</span>
              </Grid>
              <Grid item xs={12} className="Section__sectionBody d-flex flex-sm-column">
                {isSubmitView ? (
                  <>
                    <Grid item xs={12}>
                      <TextField
                        type="text"
                        label="Code"
                        required
                        value={code}
                        onChange={this.handleInputChange}
                        onBlur={this.handleInputBlur}
                        input={{
                          id: 'code',
                          key: 'code',
                          name: 'code',
                          autoComplete: 'off',
                          autoFocus: true,
                        }}
                        meta={{
                          error: !code
                            ? 'Code is Required'
                            : invalids.code
                            ? 'Invalid code format. It must be 6 digits.'
                            : '',
                          touched: code !== undefined,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        type="password"
                        label="New Password"
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
                            ? 'New password is Required'
                            : invalids.password
                            ? 'Invalid password format. It must contain at least one number, one uppercase letter, and one lowercase letter.'
                            : '',
                          touched: password !== undefined,
                        }}
                      />
                    </Grid>
                  </>
                ) : (
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
                        error: !email ? 'Email is Required' : invalids.email ? 'Invalid email format' : '',
                        touched: email !== undefined,
                      }}
                    />
                  </Grid>
                )}
              </Grid>
              <Grid item xs={12} className="Section__sectionFooter_">
                <span className="Section__sectionFooterPrimaryContent">
                  {isSubmitting ? (
                    <div style={{ position: 'relative', height: 56, width: '100%' }}>
                      <Loading />
                    </div>
                  ) : (
                    <>
                      {isSubmitView ? (
                        <button type="button" onClick={this.submit}>
                          Submit
                        </button>
                      ) : (
                        <button type="button" onClick={this.send}>
                          Send
                        </button>
                      )}
                    </>
                  )}
                </span>
                <span className="Section__sectionFooterSecondaryContent">
                  {isSubmitView ? (
                    <span role="button" className="Anchor__a" onClick={this.send} tabIndex={0}>
                      Resend code
                    </span>
                  ) : (
                    <span
                      role="button"
                      className="Anchor__a"
                      onClick={() => this.changeState('signIn')}
                      tabIndex={0}
                    >
                      Back to sign in
                    </span>
                  )}
                </span>
              </Grid>
            </Grid>
          </div>
        </div>
      </AuthWrapper>
    );
  }
}

export default FaithmoForgotPassword;
