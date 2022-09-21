import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { TimePicker as TPicker } from '@material-ui/pickers';

const TimePicker = React.memo(({ input, meta: { touched, error }, placeholder, ...rest }) => (
  <TPicker
    value={input.value}
    onChange={t => {
      input.onChange(moment(t).valueOf());
    }}
    {...rest}
    disablePast
    showTodayButton
    todayLabel="now"
    clearable
    fullWidth
    InputProps={{
      disableUnderline: true,
      placeholder,
    }}
    error={!!error && touched}
    helperText={!!error && touched ? error : ''}
  />
));

TimePicker.defaultProps = {
  meta: {
    touched: false,
    error: '',
  },
  input: {},
  placeholder: '',
  label: '',
};

TimePicker.propTypes = {
  label: PropTypes.string,
  input: PropTypes.object,
  placeholder: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
};

export default TimePicker;
