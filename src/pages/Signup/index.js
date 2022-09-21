import React from 'react';
import { SignUp } from 'aws-amplify-react';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { registerUserAmplify } from 'redux/actions/AuthActions';
import { AuthWrapper } from 'components/Auth';
import CloseImg from 'assets/images/close-x.png';
import { connect } from 'react-redux';
import UserSignupForm from './UserSignupForm';

import 'components/Auth/style.css';
import Thanks from './Thanks';

class FaithmoSignUp extends SignUp {
  constructor(props) {
    super(props);
    this.state = {
      isSubmitting: false,
      error: null,
      hidden: true,
    };
  }

  async componentDidMount() {
    const { history, as } = this.props;
    if (as === 'user') history.push('/');
  }

  handleSubmitUser = values => {
    this.setState({ isSubmitting: true }, async () => {
      // const { history, location } = this.props;

      try {
        await registerUserAmplify(values.email.toLowerCase(), values.password, values);
        this.setState({ isSubmitting: false, error: null }, () => {
          // history.push('/login', { from: location.pathname });
          this.setState({ hidden: false });
        });
      } catch (err) {
        this.setState({ isSubmitting: false, error: err });
      }
    });
  };

  removeError = () => {
    this.setState({ error: null });
  };

  goToLogin = () => {
    const { history, location } = this.props;
    this.removeError();
    history.push('/login', { from: location.pathname });
  };

  render() {
    const { isSubmitting, error, hidden } = this.state;

    return (
      <AuthWrapper>
        <Helmet title="Signup" />
        {!!error && (
          <div className="Toast__toast_">
            <span>{error.message}</span>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <span role="button" tabIndex={0} className="Toast__toastClose" onClick={this.removeError} />
          </div>
        )}
        <div className="Form__formContainer">
          <div className="close-button-container">
            {!isSubmitting && (
              <div role="button" className="close-button" onClick={this.goToLogin} tabIndex={0}>
                <img src={CloseImg} alt="Back" style={{ width: '100%', height: '100%' }} />
              </div>
            )}
          </div>
          <Thanks hidden={hidden} />
          <div className="Form__formSection">
            {hidden && <UserSignupForm isSubmitting={isSubmitting} handleSubmit={this.handleSubmitUser} />}
          </div>
        </div>
      </AuthWrapper>
    );
  }
}

FaithmoSignUp.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  as: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default withRouter(connect(({ auth: { as } }) => ({ as }))(FaithmoSignUp));
