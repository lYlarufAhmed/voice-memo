import React from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';

const Scrollbar = React.memo(
  React.forwardRef(({ verticalBarStyle, horizontalBarStyle, ...props }, ref) => {
    // eslint-disable-next-line react/prop-types
    const showingVertical = ({ style, ...rest }) => {
      const thumbStyle = {
        right: '2px',
        bottom: '2px',
        top: '2px',
        borderRadius: '3px',
        zIndex: 3,
      };
      return <div style={{ ...style, ...thumbStyle, ...verticalBarStyle }} {...rest} />;
    };
    // eslint-disable-next-line react/prop-types
    const showingHorizontal = ({ style, ...rest }) => {
      const thumbStyle = {
        right: '2px',
        bottom: '2px',
        left: '2px',
        borderRadius: '3px',
        zIndex: 3,
      };
      return <div style={{ ...style, ...thumbStyle, ...horizontalBarStyle }} {...rest} />;
    };

    return (
      <Scrollbars
        renderTrackVertical={showingVertical}
        renderTrackHorizontal={showingHorizontal}
        className="custom-scrollbars"
        {...props}
        ref={ref}
      />
    );
  }),
);

Scrollbar.defaultProps = {
  verticalBarStyle: {},
  horizontalBarStyle: {},
};

Scrollbar.propTypes = {
  verticalBarStyle: PropTypes.object,
  horizontalBarStyle: PropTypes.object,
};

export default Scrollbar;
