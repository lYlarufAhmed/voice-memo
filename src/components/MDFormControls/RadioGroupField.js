import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import { ReactComponent as TrashIcon } from '../../assets/images/trash-alt.svg';

const RadioGroupField = React.memo(
  ({ input, label, handleDelete, meta: { touched, error }, items, color, ...rest }) => {
    const deletable = typeof handleDelete === 'function';
    const onDelete = id => {
      handleDelete(id);
    };
    return (
      <FormControl component="fieldset" error={!!error && touched}>
        <FormLabel component="legend">{label}</FormLabel>
        <RadioGroup
          aria-label={label}
          {...rest}
          {...input}
          value={rest.value || input.value || ''}
          onChange={input.onChange}
        >
          {items.map((item, index) => (
            <div className="d-flex" key={item.value}>
              <FormControlLabel value={item.value} control={<Radio color={color} />} label={item.label} />
              {deletable && (
                <IconButton
                  type="button"
                  disableRipple
                  hidden={index === items.length - 1}
                  className="button lightgreen icon-button"
                  onClick={() => onDelete(item.value)}
                >
                  <TrashIcon />
                </IconButton>
              )}
            </div>
          ))}
        </RadioGroup>
        <FormHelperText>{!!error && touched ? error : ''}</FormHelperText>
      </FormControl>
    );
  },
);

RadioGroupField.defaultProps = {
  meta: {
    touched: false,
    error: '',
  },
  input: {},
  items: [],
  color: 'primary',
  handleDelete: null,
};

RadioGroupField.propTypes = {
  label: PropTypes.string.isRequired,
  input: PropTypes.object,
  handleDelete: PropTypes.func,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
  items: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string,
    }),
  ),
  color: PropTypes.string,
};

export default RadioGroupField;
