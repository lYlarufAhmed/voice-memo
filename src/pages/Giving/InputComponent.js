// eslint-disable-next-line react/prop-types
import { FormControl, FormHelperText, Input, InputAdornment, InputLabel } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { ErrorMessage, useField } from 'formik';

export const InputComponent = ({ label, startAdornment, ...props }) => {
  const [field, { error, touched }] = useField(props);
  useEffect(() => {
    const elem = document.getElementById('amount');
    if (elem)
      elem.addEventListener('wheel', e => {
        e.preventDefault();
      });
  }, []);
  return (
    <FormControl {...props} error={!!error && touched} fullWidth color="primary">
      <InputLabel shrink={false} htmlFor={field.name}>
        {label}
      </InputLabel>
      <Input
        disableUnderline
        startAdornment={startAdornment && <InputAdornment position="start">$</InputAdornment>}
        // autoFocus
        {...props}
        {...field}
        onWheel={() => false}
        onChange={e => {
          const inputValue = e.target.value;
          if (['card.exp_month', 'card.exp_year'].includes(field.name) && inputValue.length > 2) {
            return;
          }
          field.onChange(e);
        }}
      />
      <ErrorMessage name={field.name} component={FormHelperText} />
    </FormControl>
  );
};
InputComponent.defaultProps = {
  startAdornment: false,
};
InputComponent.propTypes = {
  startAdornment: PropTypes.bool,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
