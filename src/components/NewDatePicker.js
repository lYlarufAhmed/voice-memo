import React from 'react';
// import { Box, OutlinedInput } from '@material-ui/core';
// import { DatePicker } from './index';
import TodayIcon from '@material-ui/icons/Today';
import RDatePicker from 'react-date-picker';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';

const NewDatePicker = React.memo(({ label, input, ...props }) => (
  <FormControl>
    <label htmlFor={`${input.name}`}>{label}</label>
    <RDatePicker {...props} value={input.value} onChange={input.onChange} calendarIcon={<TodayIcon />} />
  </FormControl>
));
NewDatePicker.defaultProps = {
  input: {},
  clearIcon: null,
  value: new Date(),
};

NewDatePicker.propTypes = {
  value: PropTypes.object,
  clearIcon: PropTypes.any,
  input: PropTypes.object,
  label: PropTypes.string.isRequired,
};
export default NewDatePicker;
