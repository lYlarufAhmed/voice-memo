import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import './style.css';

const Loading = React.memo(({ color, style, loadingIconStyle, size, thickness }) => (
  <div className="loading" style={style}>
    <CircularProgress size={size} thickness={thickness} color={color} style={loadingIconStyle} />
  </div>
));

Loading.defaultProps = {
  color: 'primary',
  size: 32,
  thickness: 3,
  style: undefined,
  loadingIconStyle: undefined,
};

Loading.propTypes = {
  color: PropTypes.string,
  style: PropTypes.object,
  loadingIconStyle: PropTypes.object,
  size: PropTypes.number,
  thickness: PropTypes.number,
};

export default Loading;
