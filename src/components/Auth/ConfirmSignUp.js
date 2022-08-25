import React from 'react';
import { Auth } from 'aws-amplify';
import { ConfirmSignUp } from 'aws-amplify-react';
import Grid from '@material-ui/core/Grid';
import Loading from 'components/Loading';
import TextField from 'components/MDFormControls/TextField';
import CloseImg from 'assets/images/close-x.png';
import { CODE_REGEXP, EMAIL_REGEXP } from 'config/regexrs';
import AuthWrapper from './wrapper';

const INITIAL_STATE = {
  isSubmitting: false,
  code: undefined,
  email: undefined,
  invalids: {
    code: false,
    email: false,
  },
};

class FaithmoConfirmSignUp extends ConfirmSignUp {
  constructor(props) {
    super(props);

    const username = this.usernameFromAuthData();
    this.state = { ...INITIAL_STATE, email: username };

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
      const username = this.usernameFromAuthData();
      this.setState({ ...INITIAL_STATE, email: username });
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
    if (keys.includes('code') && !CODE_REGEXP.test(this.state.code)) invalids.code = true;
    if (keys.includes('email') && !EMAIL_REGEXP.test(this.state.email)) invalids.email = true;
    if (Object.keys(invalids).length > 0) {
      this.setState({ invalids });
      return false;
    }
    return true;
  };

  submit = event => {
    if (!Auth || typeof Auth.confirmSignUp !== 'function') {
      throw new Error('No Auth module found, please ensure @aws-amplify/auth is imported');
    }

    if (!this.validation(['email', 'code'])) return;

    this.setState({ isSubmitting: true }, async () => {
      const { code, email } = this.state;

      try {
        // await Auth.confirmSignUp(email.toLowerCase(), code);
        await Auth.confirmSignUp(email, code);
        this.changeState('signedUp');
      } catch (err) {
        this.error(err);
      }

      if (this._isMounted) this.setState({ isSubmitting: false });
    });
  };

  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  showComponent(_theme) {
    const { code, email, isSubmitting, invalids } = this.state;
    const username = this.usernameFromAuthData();

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
                <span className="Section__sectionHeaderContent">Confirm Sign Up</span>
              </Grid>
              <Grid item xs={12} className="Section__sectionBody">
                <Grid item xs={12} style={{ marginBottom: '2rem' }}>
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
                      disabled: !!username,
                    }}
                    meta={{
                      error: !email ? 'Email is Required' : invalids.email ? 'Invalid email format' : '',
                      touched: email !== undefined,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="text"
                    label="Confirmation Code"
                    required
                    value={code}
                    onChange={this.handleInputChange}
                    onBlur={this.handleInputBlur}
                    input={{
                      id: 'code',
                      key: 'code',
                      name: 'code',
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
                <Grid item xs={12} className="mr-sm-1">
                  <span>Lost your code?</span>
                  <span role="button" className="Anchor__a" onClick={this.resend} tabIndex={0}>
                    Resend
                  </span>
                </Grid>
              </Grid>
              <Grid item xs={12} className="Section__sectionFooter_">
                <span className="Section__sectionFooterPrimaryContent">
                  {isSubmitting ? (
                    <div style={{ position: 'relative', height: 56, width: '100%' }}>
                      <Loading />
                    </div>
                  ) : (
                    <button type="button" onClick={this.submit}>
                      Confirm
                    </button>
                  )}
                </span>
                <span className="Section__sectionFooterSecondaryContent">
                  <span
                    role="button"
                    className="Anchor__a"
                    onClick={() => this.changeState('signIn')}
                    tabIndex={0}
                  >
                    Back to sign in
                  </span>
                </span>
              </Grid>
            </Grid>
          </div>
        </div>
      </AuthWrapper>
    );
  }
}

export default FaithmoConfirmSignUp;
