import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormHelperText, Input, InputAdornment, InputLabel } from '@material-ui/core';

function useRunAfterUpdate() {
  const afterPaintRef = React.useRef(null);
  React.useLayoutEffect(() => {
    if (afterPaintRef.current) {
      afterPaintRef.current();
      afterPaintRef.current = null;
    }
  });
  // eslint-disable-next-line no-return-assign
  return fn => (afterPaintRef.current = fn);
}

const InputBox = React.memo(({ onChange, value, ...props }) => {
  const [localValue, setLocalValue] = React.useState('');
  const runAfterUpdate = useRunAfterUpdate();
  const input = useRef();
  const inputStart = useRef();

  const handleChange = e => {
    input.current = e.target;
    inputStart.current = input.current.selectionStart;
    onChange(e);
  };

  useEffect(() => {
    setLocalValue(value);
    runAfterUpdate(() => {
      if (input.current && inputStart.current) {
        input.current.selectionStart = inputStart.current;
        input.current.selectionEnd = inputStart.current;
      }
    });
  }, [value, runAfterUpdate]);

  return <Input {...props} value={localValue} onChange={handleChange} disableUnderline />;
});

InputBox.defaultProps = {
  value: '',
};

InputBox.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
};

const TextField = React.memo(
  ({
    input,
    type,
    meta: { touched, error },
    maxLength,
    onChange,
    startAdornment,
    inputComponent,
    ...rest
  }) => {
    const [length, setLength] = useState(0);
    const [helperText, sethelperText] = useState('');

    useEffect(() => {
      if (maxLength > 0) {
        let text;
        if (length > 0) {
          text = `Characters Left: ${maxLength - length}`;
        } else {
          text = '';
        }
        sethelperText(text);
      }
    }, [length, maxLength]);

    useEffect(() => {
      if (!!error && touched) sethelperText(error);
    }, [error, touched]);

    const handleChange = event => {
      const len = event.target.value ? event.target.value.length : 0;
      setLength(len);
      if (maxLength > 0 && len >= maxLength) return;
      if (input.onChange && typeof input.onChange === 'function') input.onChange(event);
      else if (onChange && typeof onChange === 'function') onChange(event);
    };

    const id = rest.id || input.id || rest.name || input.name || 'text-input';
    const value = rest.value || input.value || '';

    return (
      <FormControl {...rest} error={!!error && touched} fullWidth color="primary">
        <InputLabel shrink={false} htmlFor={id}>
          {rest.label || input.label}
        </InputLabel>
        <InputBox
          type={type}
          {...input}
          id={id}
          value={value}
          onChange={handleChange}
          aria-describedby={`${id}-helper-text`}
          inputComponent={inputComponent}
          startAdornment={startAdornment && <InputAdornment position="start">$</InputAdornment>}
          inputProps={{
            maxLength,
          }}
        />
        <FormHelperText id={`${id}-helper-text`}>
          {maxLength > 0 ? helperText : touched && error}
        </FormHelperText>
      </FormControl>
    );
  },
);

TextField.defaultProps = {
  meta: {
    touched: false,
    error: '',
  },
  type: 'text',
  input: {},
  startAdornment: null,
  maxLength: -1,
  inputComponent: undefined,
  onChange: undefined,
};

TextField.propTypes = {
  type: PropTypes.string,
  input: PropTypes.object,
  inputComponent: PropTypes.any,
  startAdornment: PropTypes.any,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
  maxLength: PropTypes.number,
  onChange: PropTypes.func,
};

export default TextField;
