import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { DateTimePicker as DTPicker } from '@material-ui/pickers';

const DateTimePicker = React.memo(({ input, meta: { touched, error }, ...rest }) => (
  <DTPicker
    value={input.value || null}
    onChange={dt => {
      input.onChange(moment(dt).valueOf());
    }}
    {...rest}
    disablePast
    showTodayButton
    clearable
    fullWidth
    InputProps={{
      disableUnderline: true,
    }}
    error={!!error && touched}
    helperText={!!error && touched ? error : ''}
  />
));

DateTimePicker.defaultProps = {
  meta: {
    touched: false,
    error: '',
  },
  input: {},
};

DateTimePicker.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
};

export default DateTimePicker;
