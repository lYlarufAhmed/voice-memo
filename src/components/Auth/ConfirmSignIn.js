import React from 'react';
import { Auth } from 'aws-amplify';
import { ConfirmSignIn } from 'aws-amplify-react';
import Grid from '@material-ui/core/Grid';
import Loading from 'components/Loading';
import TextField from 'components/MDFormControls/TextField';
import CloseImg from 'assets/images/close-x.png';
import { CODE_REGEXP } from 'config/regexrs';
import { Link } from 'react-router-dom';
import AuthWrapper from './wrapper';

const INITIAL_STATE = {
  isSubmitting: false,
  code: undefined,
  invalids: {
    code: false,
  },
  mfaType: 'SMS',
};

const isEmpty = (obj = {}) => Object.keys(obj).length === 0;

class FaithmoConfirmSignIn extends ConfirmSignIn {
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
    const mfaType = authData && authData.challengeName === 'SOFTWARE_TOKEN_MFA' ? 'TOTP' : 'SMS';

    if (prevProps.authState !== authState || this.state.mfaType !== mfaType) {
      this.setState({ ...INITIAL_STATE, mfaType });
    }
    if (super.componentDidUpdate) {
      super.componentDidUpdate(prevProps, prevState);
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
    if (event) {
      event.preventDefault();
    }
    if (!Auth || typeof Auth.confirmSignIn !== 'function') {
      throw new Error('No Auth module found, please ensure @aws-amplify/auth is imported');
    }

    if (!this.validation(['code'])) return;

    this.setState({ isSubmitting: true }, async () => {
      const { code } = this.state;
      const { authData } = this.props;
      const mfaType =
        authData && authData.challengeName === 'SOFTWARE_TOKEN_MFA' ? 'SOFTWARE_TOKEN_MFA' : null;

      try {
        await Auth.confirmSignIn(authData, code, mfaType);
        await this.checkContact(authData);
        await this.changeState('signedIn', authData);
      } catch (err) {
        this.error(err);
      }

      if (this._isMounted) this.setState({ isSubmitting: false });
    });
  };

  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  showComponent(_theme) {
    const { code, isSubmitting, invalids, mfaType } = this.state;

    return (
      <AuthWrapper>
        <div className="Form__formContainer">
          <div className="close-button-container">
            {!isSubmitting && (
              <div
                role="button"
                className="close-button"
                onClick={() => this.changeState('signedOut')}
                tabIndex={0}
              >
                <Link to="/login">
                  <img src={CloseImg} alt="Back" style={{ width: '100%', height: '100%' }} />
                </Link>
              </div>
            )}
          </div>
          <div className="Form__formSection">
            <Grid container spacing={2}>
              <Grid item xs={12} className="Section__sectionHeader">
                <span className="Section__sectionHeaderContent">Confirm {mfaType} code</span>
              </Grid>
              <Grid item xs={12} className="Section__sectionBody">
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
                    onClick={() => this.changeState('signedOut')}
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

export default FaithmoConfirmSignIn;
