import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormHelperText, MenuItem, Input, Select, makeStyles, Grow } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles({
  root: ({ opened }) => ({
    height: '36px',
    maxWidth: '100%',
    minWidth: '160px',
    background: '#777777',
    overflow: 'hidden',
    borderTopRightRadius: '18px',
    borderTopLeftRadius: '18px',
    borderBottomRightRadius: opened ? '0px' : '18px',
    borderBottomLeftRadius: opened ? '0px' : '18px',
    transition:
      'border-radius 60ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border 60ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    borderBottom: opened ? '2px solid white' : 'none',
  }),
  select: ({ opened }) => ({
    position: 'relative',
    color: '#fff',
    fontSize: '12px',
    lineHeight: '36px',
    height: '36px',
    borderTopRightRadius: '18px',
    borderTopLeftRadius: '18px',
    borderBottomRightRadius: opened ? '0px' : '18px',
    borderBottomLeftRadius: opened ? '0px' : '18px',
    '&&': {
      padding: '0px 66px 0px 24px',
    },
    '&:after': {
      position: 'absolute',
      right: '42px',
      content: "''",
      width: '2px',
      height: '100%',
      background: '#fff',
    },
  }),
  icon: {
    width: '42px',
    height: '36px',
    padding: '0px 8px',
    fill: '#fff',
    top: '0px',
    right: '0px',
  },
  underline: {
    '&:before': {
      display: 'none !important',
    },
    '&:after': {
      display: 'none !important',
    },
    '&:hover:not(.Mui-disabled):not(.Mui-focused):not(.Mui-error):before': {
      display: 'none !important',
    },
  },
  paper: {
    maxHeight: 48 * 4.5 + 8,
    boxShadow: '0px 4px 4px -2px rgba(0,0,0,0.2)',
    borderRadius: '0px 0px 18px 18px',
    backgroundColor: '#777777',
    color: '#fff',
  },
  item: {
    position: 'relative',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: 'block',
    '&:hover:after': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      content: "''",
    },
    '&.Mui-selected:after': {
      backgroundColor: 'rgba(0, 0, 0, 0.08)',
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      content: "''",
    },
    '&.Mui-selected:hover:after': {
      backgroundColor: 'rgba(0, 0, 0, 0.08)',
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      content: "''",
    },
  },
  list: {
    padding: '0px',
  },
});

const FilterDropDownMenu = React.memo(
  ({ className, menuArray, style, input, meta: { touched, error }, menuPosition, ...props }) => {
    const [opened, setOpened] = useState(false);
    const classes = useStyles({ opened });

    return (
      <FormControl
        error={!!error && touched}
        classes={{ root: classes.root }}
        className={className}
        style={style}
      >
        <Select
          {...props}
          classes={{
            root: classes.select,
            icon: classes.icon,
          }}
          input={
            <Input
              classes={{
                underline: classes.underline,
              }}
              {...input}
            />
          }
          IconComponent={iconProps => <ExpandMoreIcon {...iconProps} />}
          MenuProps={{
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: menuPosition,
            },
            transformOrigin: {
              vertical: 'top',
              horizontal: menuPosition,
            },
            getContentAnchorEl: null,
            classes: { paper: classes.paper, list: classes.list },
            TransitionComponent: Grow,
          }}
          onOpen={() => setOpened(true)}
          onClose={() => setOpened(false)}
        >
          {menuArray &&
            menuArray.map(v => (
              <MenuItem
                key={v.value}
                value={v.value}
                classes={{ root: classes.item }}
                style={{ backgroundColor: v.color || 'transparent' }}
              >
                {v.label}
              </MenuItem>
            ))}
        </Select>
        <FormHelperText>{!!error && touched ? error : ''}</FormHelperText>
      </FormControl>
    );
  },
);

FilterDropDownMenu.defaultProps = {
  meta: {
    touched: false,
    error: '',
  },
  input: {},
  menuPosition: 'left',
  style: {},
  className: undefined,
};

FilterDropDownMenu.propTypes = {
  style: PropTypes.object,
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
      color: PropTypes.string,
    }),
  ).isRequired,
  menuPosition: PropTypes.oneOf(['left', 'right', 'center']),
};

export default FilterDropDownMenu;
