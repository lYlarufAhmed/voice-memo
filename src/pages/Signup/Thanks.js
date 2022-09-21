import React from 'react';
import PropTypes from 'prop-types';
import { Hub } from 'aws-amplify';

const Thanks = ({ hidden, header, content, handler, buttonText }) => (
  <div
    className="thanks"
    hidden={hidden}
    style={{
      textAlign: 'center',
      padding: '0 40px',
    }}
  >
    <h1 style={{ marginBottom: '2rem', textTransformation: 'uppercase' }}>{header}</h1>
    <div className="thx-text">
      <p
        style={{
          fontWeight: 'bolder',
          fontSize: '34px',
          marginBottom: '4rem',
        }}
      >
        {content}
      </p>
    </div>
    {buttonText && (
      <button type="button" className="button medium gray" disabled={!buttonText} onClick={handler}>
        {buttonText}
      </button>
    )}
  </div>
);

Thanks.defaultProps = {
  header: 'Thanks! We just sent you a confirmation email.',
  content: 'Just sign in to your account and enter your verification code!',
  handler: () => {
    Hub.dispatch('faithmo_auth', {
      event: 'signout',
      data: { source: 'thanks page' },
    });
  },
  buttonText: 'OK',
};

Thanks.propTypes = {
  hidden: PropTypes.bool.isRequired,
  content: PropTypes.string,
  header: PropTypes.string,
  handler: PropTypes.func,
  buttonText: PropTypes.string,
};

export default Thanks;
