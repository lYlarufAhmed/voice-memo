import React from 'react';
import { Auth } from 'aws-amplify';
import { RequireNewPassword } from 'aws-amplify-react';
import Grid from '@material-ui/core/Grid';
import Loading from 'components/Loading';
import TextField from 'components/MDFormControls/TextField';
import CloseImg from 'assets/images/close-x.png';
import { EMAIL_REGEXP, PASSWORD_REGEXP } from 'config/regexrs';
import { logger } from 'service';
import AuthWrapper from './wrapper';

const INITIAL_STATE = {
  isSubmitting: false,
  password: undefined,
  invalids: {
    password: false,
  },
};

function convertToPlaceholder(str) {
  return str
    .split('_')
    .map(part => part.charAt(0).toUpperCase() + part.substr(1).toLowerCase())
    .join(' ');
}

function objectWithProperties(obj, keys) {
  const target = {};
  for (const key in obj) {
    if (keys.indexOf(key) !== -1) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        target[key] = obj[key];
      }
    }
  }
  return target;
}

const isEmpty = (obj = {}) => Object.keys(obj).length === 0;

class FaithmoRequireNewPassword extends RequireNewPassword {
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

  componentDidUpdate(prevProps, prevState) {
    const { authState, authData } = this.props;
    const requiredAttributes =
      (authData && authData.challengeParam && authData.challengeParam.requiredAttributes) || [];

    if (prevProps.authState !== authState) {
      this.setState({
        ...INITIAL_STATE,
        ...requiredAttributes.reduce((obj, key) => ({ ...obj, [key]: undefined }), {}),
        invalids: {
          ...INITIAL_STATE.invalids,
          ...requiredAttributes.reduce((obj, key) => ({ ...obj, [key]: false }), {}),
        },
      });
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
    if (Object.keys(invalids).length > 0) {
      this.setState({ invalids });
      return false;
    }
    return true;
  };

  checkContact = async user => {
    if (!Auth || typeof Auth.verifiedContact !== 'function') {
      throw new Error('No Auth module found, please ensure @aws-amplify/auth is imported');
    }

    const data = await Auth.verifiedContact(user);

    if (!isEmpty(data.verified)) {
      this.changeState('signedIn', user);
    } else {
      // eslint-disable-next-line no-param-reassign
      user = Object.assign(user, data);
      this.changeState('verifyContact', user);
    }
  };

  submit = event => {
    if (!Auth || typeof Auth.completeNewPassword !== 'function') {
      throw new Error('No Auth module found, please ensure @aws-amplify/auth is imported');
    }

    const { authData } = this.props;
    const requiredAttributes =
      (authData && authData.challengeParam && authData.challengeParam.requiredAttributes) || [];

    if (!this.validation([...requiredAttributes, 'password'])) return;

    this.setState({ isSubmitting: true }, async () => {
      const { password } = this.state;

      try {
        const attrs = objectWithProperties(this.inputs, requiredAttributes);
        const user = await Auth.completeNewPassword(authData, password, attrs);
        logger.debug('complete new password', user);
        if (user.challengeName === 'SMS_MFA') {
          this.changeState('confirmSignIn', user);
        } else if (user.challengeName === 'MFA_SETUP') {
          logger.debug('TOTP setup', user.challengeParam);
          this.changeState('TOTPSetup', user);
        } else {
          await this.checkContact(user);
        }
      } catch (err) {
        this.error(err);
      }

      if (this._isMounted) this.setState({ isSubmitting: false });
    });
  };

  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  showComponent(_theme) {
    const { password, isSubmitting, invalids } = this.state;
    const { authData } = this.props;
    const requiredAttributes =
      (authData && authData.challengeParam && authData.challengeParam.requiredAttributes) || [];

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
                <span className="Section__sectionHeaderContent">Change Password</span>
              </Grid>
              <Grid item xs={12} className="Section__sectionBody">
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
                {requiredAttributes.map(attr => (
                  <Grid item xs={12}>
                    <TextField
                      type="text"
                      label={convertToPlaceholder(attr)}
                      required
                      value={this.state[attr]}
                      onChange={this.handleInputChange}
                      onBlur={this.handleInputBlur}
                      input={{
                        id: attr,
                        key: attr,
                        name: attr,
                      }}
                      meta={{
                        error: !this.state[attr]
                          ? `${convertToPlaceholder(attr)} is Required`
                          : invalids[attr]
                          ? `Invalid ${attr} input`
                          : '',
                        touched: this.state[attr] !== undefined,
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
              <Grid item xs={12} className="Section__sectionFooter_">
                <span className="Section__sectionFooterPrimaryContent">
                  {isSubmitting ? (
                    <div style={{ position: 'relative', height: 56, width: '100%' }}>
                      <Loading />
                    </div>
                  ) : (
                    <button type="button" onClick={this.submit}>
                      Change
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

export default FaithmoRequireNewPassword;
