import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
  root: ({ rootStyle }) => ({
    '& .MuiBackdrop-root': {
      backgroundColor: 'none',
    },
    ...rootStyle,
  }),
  dialogPaper: {
    borderRadius: '30px',
    overflow: 'unset',
  },
  content: ({ padding, style }) => ({
    padding: `${theme.spacing(padding)}px !important`,
    ...style,
  }),
  title: {},
  actions: {
    borderBottomLeftRadius: '30px',
    borderBottomRightRadius: '30px',
    overflow: 'hidden',
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  closeButton: {
    height: '60px',
    background: 'rgb(114, 114, 114)',
    width: '100%',
    color: 'white',
    '&:hover': {
      color: 'rgb(114, 114, 114)',
    },
    borderRadius: 0,
    margin: '0 !important',
  },
  actionBtn: {
    width: 132,
    margin: `${theme.spacing(2)}px !important`,
  },
}));

const TransparentModal = React.memo(
  ({
    className,
    rootStyle,
    style,
    open,
    onClose,
    title,
    maxWidth,
    children,
    padding,
    showCloseIcon,
    fullWidth,
    fullScreen,
    Transition,
    disableEscapeKeyDown,
    disableBackdropClick,
    closeBtnLabel,
    submitBtnLabel,
    onSubmit,
    actionBtnSize,
  }) => {
    const classes = useStyles({ padding, rootStyle, style });

    return (
      <Dialog
        fullScreen={fullScreen}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        scroll="body"
        classes={{
          root: classes.root,
        }}
        TransitionComponent={Transition}
        transitionDuration={{ enter: 500, exit: 300 }}
        onClose={(event, reason) => {
          if (
            (reason === 'backdropClick' && !disableBackdropClick) ||
            (reason === 'escapeKeyDown' && !disableEscapeKeyDown)
          ) {
            onClose();
          }
        }}
        PaperProps={{
          className: classes.dialogPaper,
        }}
        // disableEscapeKeyDown={disableEscapeKeyDown}
        // disableBackdropClick={disableBackdropClick}
      >
        {!!title && <DialogTitle className={classes.title}>{title}</DialogTitle>}
        <DialogContent className={clsx(classes.content, className)}>{children}</DialogContent>
        <DialogActions className={classes.actions}>
          {submitBtnLabel && (
            <button
              type="button"
              className={clsx(
                classes.actionBtn,
                'button',
                'border--red',
                'neutral',
                'action',
                actionBtnSize,
              )}
              onClick={onSubmit || onClose}
            >
              {submitBtnLabel}
            </button>
          )}
          {closeBtnLabel && (
            <button
              type="button"
              className={clsx(
                classes.actionBtn,
                'button',
                'border--red',
                'neutral',
                'action',
                actionBtnSize,
              )}
              onClick={onClose}
            >
              {closeBtnLabel}
            </button>
          )}
          {showCloseIcon && (
            <Button className={classes.closeButton} onClick={onClose}>
              <CloseIcon fontSize="large" />
            </Button>
          )}
        </DialogActions>
      </Dialog>
    );
  },
);

TransparentModal.defaultProps = {
  maxWidth: 'md',
  title: '',
  children: null,
  padding: 4,
  showCloseIcon: false,
  fullWidth: false,
  fullScreen: false,
  Transition: undefined,
  className: undefined,
  disableEscapeKeyDown: false,
  disableBackdropClick: false,
  closeBtnLabel: undefined,
  submitBtnLabel: undefined,
  onSubmit: undefined,
  actionBtnSize: 'small',
  style: {
    fontWeight: 'bold',
    color: '#3b3b3b',
    textAlign: 'center',
  },
  rootStyle: {},
};

TransparentModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  showCloseIcon: PropTypes.bool,
  closeBtnLabel: PropTypes.string,
  onSubmit: PropTypes.func,
  submitBtnLabel: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  maxWidth: PropTypes.string,
  title: PropTypes.string,
  padding: PropTypes.number,
  Transition: PropTypes.node,
  fullWidth: PropTypes.bool,
  fullScreen: PropTypes.bool,
  disableEscapeKeyDown: PropTypes.bool,
  disableBackdropClick: PropTypes.bool,
  actionBtnSize: PropTypes.string,
  style: PropTypes.object,
  rootStyle: PropTypes.object,
};

export default TransparentModal;
