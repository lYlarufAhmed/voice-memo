import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Hub, Auth } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
import amplifyConfigParams from 'amplify_auth_params.js';
import { Loading } from 'components';
import { storage } from 'service';

class Login extends Component {
  componentDidMount() {
    Auth.currentAuthenticatedUser()
      .then(cognitoUser => {
        // eslint-disable-next-line no-console
        // console.log(cognitoUser.signInUserSession.idToken.jwtToken);
        const { email, email_verified: emailVerified } = cognitoUser.attributes;
        if (email === process.env.REACT_APP_GUEST_EMAIL) {
          this.load();
          return;
        }
        if (!email || !emailVerified) {
          Hub.dispatch('faithmo_auth', {
            event: 'signout',
            data: { error: 'Your email invalid or not verified.', email, emailVerified },
          });
          return;
        }
        const signUpData = storage.getItem(`unverified_faithmo_signup_data[${email}]`);
        if (signUpData) {
          Hub.dispatch('faithmo_auth', {
            event: 'signup',
            data: { signUpData, email },
          });
        } else {
          this.load();
        }
      })
      .catch(error => {
        Hub.dispatch('faithmo_auth', {
          event: 'signout',
          data: { error },
        });
      });
  }

  load = attr => {
    const { location } = this.props;
    let { from } = location.state || { from: '/dashboard' };
    from = from === '/login' || from === '/' ? '/dashboard' : from;
    Hub.dispatch('faithmo_auth', {
      event: 'signin',
      data: { ...attr, from: '/login', to: from },
    });
  };

  render() {
    return (
      <div className="app-loading-container">
        <Loading size={48} thickness={2} />
      </div>
    );
  }
}

Login.propTypes = {
  location: PropTypes.object.isRequired,
};

export default withAuthenticator(Login, amplifyConfigParams);
