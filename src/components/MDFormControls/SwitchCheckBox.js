import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';

const useStyles = makeStyles(theme => ({
  root: ({ dimension }) => ({
    width: dimension.width,
    height: dimension.height,
    padding: 0,
    margin: theme.spacing(1),
  }),
  switchBase: ({ dimension, type }) => ({
    padding: 0,
    '&.Mui-checked': {
      transform: `translateX(${dimension.width / 2}px)`,
      color: theme.palette.common.white,
      '& + .MuiSwitch-track': {
        backgroundColor: type === 'ios' ? '#bada55' : `${theme.palette.secondary.main}`,
        opacity: 1,
        border: 'none',
        '&:after': {
          opacity: 0,
        },
        '&:before': {
          opacity: 1,
        },
      },
      '& .MuiSwitch-thumb': {
        border: `2px solid ${type === 'ios' ? '#bada55' : theme.palette.secondary.main}`,
        borderLeft: type === 'ios' ? '2px solid #bada55' : 0,
      },
    },
  }),
  thumb: ({ type, dimension }) => ({
    width: dimension.width / 2,
    height: dimension.height,
    borderRadius: type === 'ios' ? '50%' : 0,
    border: `2px solid ${theme.palette.primary.main}`,
    borderRight: type === 'ios' ? `2px solid ${theme.palette.primary.main}` : 0,
    transition: theme.transitions.create(['border']),
    boxShadow: 'none',
  }),
  track: ({ labelNo, labelYes, type, dimension, size }) => ({
    borderRadius: type === 'ios' ? dimension.height : 0,
    border: type === 'ios' ? '1px solid #bdbdbd' : 'none',
    backgroundColor: theme.palette.primary.main,
    opacity: 1,
    transition: theme.transitions.create(['background-color']),
    '&:after': {
      transition: theme.transitions.create(['opacity']),
      opacity: 1,
      top: '3px',
      color: 'white',
      right: size === 'small' ? '8px' : '12px',
      content: `"${labelNo}"`,
      position: 'absolute',
      fontSize: size === 'small' ? '13px' : '16px',
      fontWeight: 'bold',
    },
    '&:before': {
      transition: theme.transitions.create(['opacity']),
      opacity: 0,
      top: '3px',
      color: 'white',
      content: `"${labelYes}"`,
      left: size === 'small' ? '8px' : '12px',
      position: 'absolute',
      fontSize: size === 'small' ? '13px' : '16px',
      fontWeight: 'bold',
    },
  }),
  checked: {},
  focusVisible: {},
}));

const SwitchCheckBox = ({ labelNo, labelYes, type, size, ...props }) => {
  const getSize = () => {
    let dimension = {
      width: 96,
      height: 32,
    };
    if (type === 'ios') {
      dimension = { width: 52, height: 26 };
    }
    if (size === 'small') {
      dimension = {
        width: dimension.width / 1.25,
        height: dimension.height / 1.25,
      };
    }

    return dimension;
  };

  const classes = useStyles({ labelNo, labelYes, dimension: getSize(), type, size });

  return (
    <Switch
      {...props}
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
    />
  );
};

SwitchCheckBox.defaultProps = {
  labelNo: '',
  labelYes: '',
  type: 'box',
  size: 'normal',
};

SwitchCheckBox.propTypes = {
  labelNo: PropTypes.string,
  labelYes: PropTypes.string,
  type: PropTypes.oneOf(['ios', 'box']),
  size: PropTypes.oneOf(['small', 'normal']),
};

export default SwitchCheckBox;
