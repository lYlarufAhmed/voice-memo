import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AvatarEdit from 'react-avatar-edit';
import StyledModal from 'components/StyledModal';
import userStar from 'assets/images/groupstar.png';
import pencilImg from 'assets/images/pencil.svg';
import userImg from 'assets/images/default_user.png';
import groupImg from 'assets/images/default_group.png';
import churchImg from 'assets/images/default_church.png';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import { ReactComponent as StarIcon } from 'assets/images/star.svg';

import './style.css';

class Avatar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      preview: null,
      isEditModalOpen: false,
    };
  }

  onClose = () => {
    const { onChange } = this.props;
    this.setState({ preview: null, isEditModalOpen: false }, () => {
      if (onChange) onChange(); // Pass undefined value if not updated.
    });
  };

  onSave = () => {
    const { preview } = this.state;
    const { onChange } = this.props;
    this.setState({ preview: null, isEditModalOpen: false }, () => {
      if (onChange) onChange(preview); // Pass value of updated. ( if the avatar was removed, the preview is null. )
    });
  };

  onClear = () => {
    this.setState({ preview: null });
  };

  onCrop = preview => {
    this.setState({ preview });
  };

  onUserBadgeClick = event => {
    const { onBadgeClick } = this.props;
    if (onBadgeClick && typeof onBadgeClick === 'function') {
      event.stopPropagation();
      onBadgeClick(event);
    }
  };

  onClick = event => {
    const { editable, onClick } = this.props;
    if (editable) {
      event.stopPropagation();
      this.setState({ isEditModalOpen: true });
    } else if (onClick) {
      onClick(event);
    }
  };

  render() {
    const {
      src,
      type,
      badge,
      onBadgeClick,
      size,
      modalSize,
      width,
      height,
      onChange,
      editable,
      preview,
      style,
      back,
      onClick,
      ...rest
    } = this.props;
    const { isEditModalOpen } = this.state;

    const mSize = {
      small: 240,
      medium: 360,
      large: 480,
    };

    let style2 = {};
    switch (size) {
      case 'large':
        style2 = {
          avatar: { width: width || '75px', height: height || '75px' },
          badge: {
            bottom: '-2px',
            right: '-2px',
          },
        };
        break;
      case 'small':
        style2 = {
          avatar: { width: width || '36px', height: height || '36px' },
          badge: {
            bottom: '-8px',
            right: '-8px',
          },
        };
        break;
      case 'medium':
      default:
        style2 = {
          avatar: { width: width || '42px', height: height || '42px' },
          badge: {
            bottom: '-6px',
            right: '-6px',
          },
        };
        break;
    }

    const renderBadge = () => {
      if (!badge) return <></>;
      if (badge === 'star') return <StarIcon className="avatar-badge star-badge" />;
      if (badge === 'photo') return <CameraAltIcon className="avatar-badge photo-badge" />;
      if (badge === 'hornor' || badge === true)
        return (
          <div
            role="button"
            className="avatar-badge"
            onClick={this.onUserBadgeClick}
            tabIndex={0}
            style={{
              cursor: onBadgeClick && typeof onBadgeClick === 'function' ? 'pointer' : 'inherit',
              ...style2.badge,
            }}
          >
            <img src={userStar} alt="userStar" style={{ width: '100%', height: '100%' }} />
          </div>
        );
      return <></>;
    };

    const defaultImg = () => {
      if (type === 'user') return userImg;
      if (type === 'group') return groupImg;
      if (type === 'church') return churchImg;
      return userImg;
    };

    const imgProps =
      editable || onClick
        ? {
            role: 'button',
            onClick: this.onClick,
            tabIndex: 0,
          }
        : {};

    return (
      <>
        <div className="user-avatar" {...rest} style={{ ...style, ...style2.avatar }}>
          <div
            style={{
              ...style2.avatar,
              background: back,
              borderRadius: '999999px',
              overflow: 'hidden',
            }}
          >
            <div style={{ ...style2.avatar }} {...imgProps}>
              <img src={src || defaultImg()} alt="Avatar" style={{ width: '100%', height: '100%' }} />
            </div>
            {editable && (
              <div
                role="button"
                className="avatar-hover"
                onClick={this.onClick}
                tabIndex={0}
                style={{
                  borderRadius: '9999px',
                }}
              >
                <img className="hover-icon" src={pencilImg} alt="Edit" />
                <span style={{ fontSize: style2.avatar.width > 120 ? 16 : style2.avatar.width / 8 }}>
                  Change Image
                </span>
              </div>
            )}
          </div>
          {renderBadge()}
        </div>
        <StyledModal
          className="avatar-modal"
          open={editable && isEditModalOpen}
          onClose={this.onClose}
          disableEscapeKeyDown
          disableBackdropClick
        >
          <AvatarEdit
            width={mSize[modalSize] || mSize.medium}
            height={mSize[modalSize] || mSize.medium}
            imageWidth={mSize[modalSize] || mSize.medium}
            label="Please choose a file."
            labelStyle={{
              margin: 0,
              padding: 0,
              textAlign: 'center',
              width: '100%',
              lineHeight: `calc(${mSize[modalSize] || mSize.medium}px - 10px)`,
              fontSize: '1.25em',
              fontWeight: 'bold',
              color: 'black',
              display: 'inline-block',
              cursor: 'pointer',
            }}
            onCrop={this.onCrop}
            onClose={this.onClear}
            src={preview ? src : undefined}
          />
          <div className="mt-4 d-flex align-items-center justify-content-around flex-column flex-sm-row">
            <button
              type="button"
              className={`button border--gray neutral ${
                modalSize === 'small' ? 'small' : 'medium'
              } mb-1 mb-sm-0 mr-sm-1`}
              onClick={this.onClose}
            >
              Discard
            </button>
            <button
              type="button"
              className={`button border--gray neutral ${modalSize === 'small' ? 'small' : 'medium'}`}
              onClick={this.onSave}
            >
              Save
            </button>
          </div>
        </StyledModal>
      </>
    );
  }
}

Avatar.defaultProps = {
  back: '#eee',
  editable: false,
  size: 'medium',
  preview: false,
  type: 'user',
  badge: false,
  modalSize: 'medium',
  onChange: undefined,
  onClick: undefined,
  onBadgeClick: null,
  width: null,
  height: null,
  src: null,
  style: {},
};

Avatar.propTypes = {
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  badge: PropTypes.oneOf(['hornor', 'photo', 'star', true, false]),
  type: PropTypes.oneOf(['user', 'group', 'church']),
  preview: PropTypes.bool,
  onBadgeClick: PropTypes.func,
  width: PropTypes.number,
  height: PropTypes.number,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  modalSize: PropTypes.oneOf(['small', 'medium', 'large']),
  src: PropTypes.any,
  back: PropTypes.string,
  style: PropTypes.object,
  editable: PropTypes.bool,
};

export default Avatar;
