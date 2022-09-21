import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import SwitchCheckBox from './SwitchCheckBox';

const CheckBoxField = React.memo(({ checkBoxType, input, label, meta: { touched, error }, ...rest }) => (
  <FormControl error={!!error && touched} {...rest}>
    <FormControlLabel
      control={
        checkBoxType === 'switch' ? (
          <SwitchCheckBox size="small" checked={!!input.value} onChange={input.onChange} />
        ) : (
          <Checkbox checked={!!input.value} onChange={input.onChange} />
        )
      }
      label={label}
    />
    <FormHelperText>{!!error && touched ? error : ''}</FormHelperText>
  </FormControl>
));

CheckBoxField.defaultProps = {
  meta: {
    touched: false,
    error: '',
  },
  input: {},
  checkBoxType: 'default',
};

CheckBoxField.propTypes = {
  label: PropTypes.string.isRequired,
  input: PropTypes.object,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
  checkBoxType: PropTypes.oneOf(['default', 'switch']),
};

export default CheckBoxField;
