import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import MTooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles(theme => ({
  arrow: {
    color: theme.palette.primary.main,
  },
  tooltip: ({ padding, color }) => ({
    backgroundColor: theme.palette.background.paper,
    border: `2px solid ${theme.palette.primary.main}`,
    color: color || theme.palette.text.secondary,
    fontSize: '14px',
    padding: theme.spacing(padding),
  }),
}));

function Tooltip({ color, padding, ...props }) {
  const classes = useStyles({ color, padding });

  return <MTooltip arrow classes={classes} {...props} />;
}

Tooltip.defaultProps = {
  padding: 1,
  color: undefined,
};

Tooltip.propTypes = {
  color: PropTypes.string,
  padding: PropTypes.number,
};

export default Tooltip;
