import React from 'react';
import RDatePicker from 'react-date-picker';
import TodayIcon from '@material-ui/icons/Today';

import './style.css';
import PropTypes from 'prop-types';

const DatePicker = React.memo(props => <RDatePicker {...props} calendarIcon={<TodayIcon />} />);
DatePicker.defaultProps = {
  clearIcon: null,
  value: new Date(),
};

DatePicker.propTypes = {
  clearIcon: PropTypes.object,
  value: PropTypes.object,
  onChange: PropTypes.func.isRequired,
};
export default DatePicker;
