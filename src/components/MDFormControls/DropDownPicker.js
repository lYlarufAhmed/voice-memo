import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import { InputLabel } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

const useStyles = makeStyles(theme => ({
  formControl: {
    minWidth: 120,
    width: '100%',
    textAlign: 'start',
  },
}));

const DropDownPicker = React.memo(
  ({ className, menuArray, style, label, input, meta: { touched, error }, ...rest }) => {
    const classes = useStyles();
    const id = rest.id || input.id || rest.name || input.name || 'dropdown-picker';
    const value = rest.value || input.value || '';

    return (
      <FormControl
        error={!!error && touched}
        className={clsx(classes.formControl, className)}
        style={style}
      >
        <InputLabel htmlFor={id} shrink={false}>
          {label}
        </InputLabel>
        <Select
          variant="filled"
          {...rest}
          {...input}
          labelId={id}
          value={value}
          disableUnderline
          MenuProps={MenuProps}
          IconComponent={ExpandMoreIcon}
        >
          {!!rest.displayEmpty && (
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
          )}
          {menuArray &&
            menuArray.map(v => (
              <MenuItem key={v.value} value={v.value}>
                {v.label}
              </MenuItem>
            ))}
        </Select>
        <FormHelperText>{!!error && touched ? error : ''}</FormHelperText>
      </FormControl>
    );
  },
);

DropDownPicker.defaultProps = {
  meta: {
    touched: false,
    error: '',
  },
  input: {},
  style: undefined,
  className: undefined,
  displayEmpty: false,
};

DropDownPicker.propTypes = {
  style: PropTypes.object,
  label: PropTypes.string.isRequired,
  input: PropTypes.object,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
  className: PropTypes.string,
  menuArray: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    }),
  ).isRequired,
  displayEmpty: PropTypes.bool,
};

export default DropDownPicker;
