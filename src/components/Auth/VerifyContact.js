import React from 'react';
import { VerifyContact } from 'aws-amplify-react';
import { Auth } from 'aws-amplify';
import Grid from '@material-ui/core/Grid';
import Loading from 'components/Loading';
import TextField from 'components/MDFormControls/TextField';
import RadioGroupField from 'components/MDFormControls/RadioGroupField';
import { logger } from 'service';
import { CODE_REGEXP } from 'config/regexrs';
import CloseImg from 'assets/images/close-x.png';
import AuthWrapper from './wrapper';

const INITIAL_STATE = {
  isSubmitting: false,
  contact: undefined,
  code: undefined,
  invalids: {
    contact: false,
    code: false,
  },
  verifyAttr: null,
};
/* eslint-disable react/prop-types */
const VerifyView = ({ authData, contact, onChange, onBlur }) => {
  if (!authData) {
    logger.debug('no user for verify');
    return null;
  }
  const { unverified } = authData;
  if (!unverified) {
    logger.debug('no unverified on user');
    return null;
  }
  const { email, phone_number: phoneNumber } = unverified;

  const items = [];

  if (email) items.push({ label: 'Email', value: 'email' });
  if (phoneNumber) items.push({ label: 'Phone number', value: 'phone_number' });

  return (
    <RadioGroupField
      label="Select the item you want to verify"
      required
      items={items}
      value={contact}
      onChange={onChange}
      onBlur={onBlur}
      input={{
        id: 'contact',
        key: 'contact',
        name: 'contact',
      }}
      meta={{
        error: !contact ? 'Please Select one of them' : '',
        touched: contact !== undefined,
      }}
    />
  );
};
/* eslint-enable react/prop-types */

class FaithmoVerifyContact extends VerifyContact {
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
    if (keys.includes('code') && !CODE_REGEXP.test(this.state.code)) invalids.code = true;
    if (Object.keys(invalids).length > 0) {
      this.setState({ invalids });
      return false;
    }
    return true;
  };

  verify = async () => {
    if (!Auth || typeof Auth.verifyCurrentUserAttribute !== 'function') {
      throw new Error('No Auth module found, please ensure @aws-amplify/auth is imported');
    }

    if (!this.validation(['contact'])) {
      this.error('Neither Email nor Phone Number selected');
      return;
    }

    this.setState({ isSubmitting: true }, async () => {
      const { checkedValue } = this.inputs;

      try {
        const data = await Auth.verifyCurrentUserAttribute(checkedValue);
        logger.debug(data);
        if (this._isMounted) this.setState({ verifyAttr: checkedValue, isSubmitting: false });
      } catch (err) {
        if (this._isMounted) this.setState({ isSubmitting: false });
        this.error(err);
      }
    });
  };

  submit = () => {
    if (!Auth || typeof Auth.verifyCurrentUserAttributeSubmit !== 'function') {
      throw new Error('No Auth module found, please ensure @aws-amplify/auth is imported');
    }

    if (!this.validation(['code'])) return;

    this.setState({ isSubmitting: true }, async () => {
      const { code, verifyAttr } = this.state;
      const { authData } = this.props;

      try {
        const data = await Auth.verifyCurrentUserAttributeSubmit(verifyAttr, code);
        logger.debug(data);
        this.changeState('signedIn', authData);
        if (this._isMounted) this.setState({ verifyAttr: null, isSubmitting: false });
      } catch (err) {
        if (this._isMounted) this.setState({ isSubmitting: false });
        this.error(err);
      }
    });
  };

  skip = () => {
    const { authData } = this.props;
    this.changeState('signedIn', authData);
  };

  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  showComponent(_theme) {
    const { verifyAttr, code, contact, invalids, isSubmitting } = this.state;
    const { authData } = this.props;

    const isSubmitView = verifyAttr;

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
                <span className="Section__sectionHeaderContent" style={{ margin: 0 }}>
                  Verify contact information
                </span>
                <p
                  className="Section__sectionHeaderContent"
                  style={{ textTransform: 'none', fontSize: '1em' }}
                >
                  Account recovery requires verified contact information
                </p>
              </Grid>
              <Grid item xs={12} className="Section__sectionBody">
                {isSubmitView ? (
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
                ) : (
                  <Grid item xs={12}>
                    <VerifyView
                      authData={authData}
                      contact={contact}
                      onChange={this.handleInputChange}
                      onBlur={this.handleInputBlur}
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
                        <button type="button" onClick={this.verify}>
                          Verify
                        </button>
                      )}
                    </>
                  )}
                </span>
                <span className="Section__sectionFooterSecondaryContent">
                  <span role="button" className="Anchor__a" onClick={this.skip} tabIndex={0}>
                    Skip
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

export default FaithmoVerifyContact;
