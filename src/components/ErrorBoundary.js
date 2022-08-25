import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    const { errorInfo, error } = this.state;
    const { children } = this.props;
    if (errorInfo) {
      // You can render any custom fallback UI
      return (
        <div>
          <h2>Something went wrong.</h2>
          {process.env.REACT_APP_STAGE === 'development' && (
            <details style={{ whiteSpace: 'pre-wrap' }}>
              {error && error.toString()}
              <br />
              {errorInfo.componentStack}
            </details>
          )}
        </div>
      );
    }

    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.any.isRequired,
};

export default ErrorBoundary;
