import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import FormControl from '@material-ui/core/FormControl';
import CustomLabel from '../CustomLabel';

const InputBox = React.memo(({ className, normalize, label, maxLength, onChange, error, ...rest }) => {
  return (
    <FormControl>
      <CustomLabel value={label} />
      <input {...rest} id="my-input" />
    </FormControl>
  );
});

InputBox.defaultProps = {
  maxLength: -1,
  error: '',
  className: undefined,
  onChange: undefined,
  normalize: () => {},
};

InputBox.propTypes = {
  className: PropTypes.string,
  error: PropTypes.string,
  maxLength: PropTypes.number,
  onChange: PropTypes.func,
  normalize: PropTypes.func,
  label: PropTypes.string.isRequired,
};

export default InputBox;
