import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';

import './style.css';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const useStyles = makeStyles(theme => ({
  formControl: {
    color: '#495057',
    margin: theme.spacing(0),
    minWidth: 120,
    width: '100%',
    borderRadius: '.25rem',
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(0, 0, 0, 0.23)',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#80bdff',
      borderWidth: 1,
    },
    '&.Mui-focused': {
      boxShadow: '0 0 0 1px rgba(0, 123, 255, 0.25)',
    },
    '&.form-control': {
      padding: 0,
    },
  },
  selectRoot: {
    paddingTop: 14,
    paddingBottom: 14,
    '.form-control &': {
      paddingTop: '0.375rem',
      paddingBottom: '0.375rem',
    },
  },
  placeHolder: ({ placeHolderStyle }) => ({
    ...placeHolderStyle,
  }),
  menuList: {
    padding: 0,
  },
  MenuItem: {
    position: 'relative',
    '&:after': {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1,
      overflow: 'hidden',
      position: 'absolute',
      borderRadius: 'inherit',
      backgroundColor: 'transparent',
      content: "''",
    },
    '&:hover:after': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
    '&:focus:after': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
    '&.place-holder:after': {
      content: 'none',
    },
  },
  MenuItemBackground: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
    overflow: 'hidden',
    position: 'absolute',
    borderRadius: 'inherit',
    pointerEvents: 'none',
  },
}));

function isEmpty(value, emptyValue) {
  if ((!emptyValue && emptyValue !== 0) || (!value && value !== 0)) {
    return !value;
  }
  return value === emptyValue;
}

const BootstrapSelect = React.memo(
  ({
    items,
    onChange,
    value,
    placeHolder,
    emptyValue,
    placeHolderStyle,
    emptyColor,
    disabled,
    className,
    style,
  }) => {
    const classes = useStyles({ placeHolderStyle: { ...placeHolderStyle, fontSize: undefined } });
    let menuItems = [...items];
    if (placeHolder !== null) {
      menuItems = [{ label: placeHolder, value: '', color: emptyColor }, ...menuItems];
    }
    const convertedValue = isEmpty(value, emptyValue) ? '' : value;

    const handleChange = event => {
      let v = event.target.value;
      if (isEmpty(v, emptyValue)) {
        v = emptyValue;
      }
      onChange(v);
    };

    return (
      <Select
        variant="outlined"
        className={clsx(classes.formControl, className, !convertedValue && classes.placeHolder)}
        MenuProps={{
          classes: {
            list: classes.menuList,
          },
          PaperProps: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            },
          },
        }}
        classes={{
          root: classes.selectRoot,
        }}
        style={style}
        disabled={disabled}
        displayEmpty
        onChange={handleChange}
        value={convertedValue}
      >
        {menuItems.map(item => {
          const isPlaceHolder = isEmpty(item.value, emptyValue);

          return (
            <MenuItem
              className={clsx(
                classes.MenuItem,
                isPlaceHolder && classes.placeHolder,
                isPlaceHolder && 'place-holder',
              )}
              key={item.value}
              value={item.value}
            >
              <span
                className={classes.MenuItemBackground}
                style={{ backgroundColor: item.color || 'white' }}
              />
              <span style={{ position: 'relative', zIndex: 1 }}>{item.label}</span>
            </MenuItem>
          );
        })}
      </Select>
    );
  },
);

BootstrapSelect.defaultProps = {
  emptyValue: null,
  emptyColor: 'white',
  placeHolder: null,
  placeHolderStyle: {
    color: '#6c757d',
    fontStyle: 'italic',
  },
  value: null,
  disabled: false,
  className: undefined,
  style: {},
};

BootstrapSelect.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    }),
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  placeHolder: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  placeHolderStyle: PropTypes.object,
  emptyValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  emptyColor: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default BootstrapSelect;
