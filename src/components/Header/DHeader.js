import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Hub } from 'aws-amplify';
import Avatar from 'components/Avatar';
import StyledModal from 'components/StyledModal';
import FaithmoIcon from 'assets/images/default_church.png';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MenuIcon from '@material-ui/icons/Menu';

import './style.css';
import { Button } from '@material-ui/core';

class DHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openProfileModal: false,
    };
  }

  handleLogout = () => {
    this.setState({ openProfileModal: false }, () => {
      Hub.dispatch('faithmo_auth', { event: 'signout' });
    });
  };

  onOpenProfileModal = () => {
    this.setState({ openProfileModal: true });
  };

  toProfile = () => {
    const { history, location } = this.props;
    history.push(`/dashboard/profile`, { edit: false, from: location.pathname });
    this.setState({ openProfileModal: false });
  };

  toHistory = () => {
    const { history, location } = this.props;
    history.push(`/dashboard/history`, { from: location.pathname });
  };

  toGiving = () => {
    const { history, location } = this.props;
    history.push(`/giving`, { from: location.pathname });
  };

  onCloseProfileModal = () => {
    this.setState({ openProfileModal: false });
  };

  reloadOrNavigate = () => {
    const { history, location } = this.props;
    if (location.pathname === '/dashboard') {
      Hub.dispatch('faithmo_auth', { event: 'signin' });
    } else {
      history.push('/dashboard', { from: location.pathname });
    }
  };

  render() {
    const { openProfileModal } = this.state;
    const {
      authUser,
      isGuest,
      authUserFullName,
      authUserEmail,
      location,
      currentChurchTitle,
      currentChurchLogo,
    } = this.props;
    const { ref } = this.props;

    return (
      <nav className="app-header navbar navbar-expand-md">
        <div
          className="d-flex justify-content-between flex-wrap align-items-center"
          style={{ width: '100%' }}
          ref={ref}
        >
          <div
            role="button"
            className="col d-logo navbar-brand nav-col d-flex flex-column align-items-center"
            onClick={this.reloadOrNavigate}
            tabIndex={0}
            style={{ padding: 0, margin: 0 }}
          >
            <img alt="FaithmoIcon" height={100} width={100} src={currentChurchLogo || FaithmoIcon} />
            <h3 className="title" id="lg-title">
              {currentChurchTitle}
            </h3>
          </div>

          <div className="d-flex align-items-center">
            <Button
              className="navbar-toggler nav-col"
              startIcon={<MenuIcon fontSize="large" />}
              disableRipple
              data-toggle="collapse"
              data-target="#navbarCollapse"
              aria-controls="navbarCollapse"
              aria-expanded="false"
              aria-label="Toggle navigation"
              style={{ justifySelf: 'flex-end' }}
            />
            <div
              role="button"
              id="sm-avatar"
              className="d-usermenu"
              onClick={this.onOpenProfileModal}
              tabIndex={0}
              style={{ justifySelf: 'flex-end' }}
            >
              <Avatar src={isGuest ? '' : authUser.avatar} />
              <p className="name--user">
                <ExpandMoreIcon style={{ fontSize: '28px', color: '#31c5c3' }} />
              </p>
            </div>
          </div>
          <div
            className="collapse navbar-collapse align-items-center flex-wrap nav-col"
            id="navbarCollapse"
          >
            <div className="nav-links navbar-nav mr-auto nav-col">
              {!isGuest && (
                <>
                  <button
                    type="button"
                    className={`nav-item ${location.pathname.indexOf('profile') > -1 && 'active'}`}
                    onClick={this.toProfile}
                  >
                    Profile
                  </button>

                  <button
                    type="button"
                    className={`nav-item ${location.pathname.indexOf('giving') > -1 && 'active'}`}
                    onClick={this.toGiving}
                  >
                    Giving
                  </button>
                  <button
                    type="button"
                    className={`nav-item ${location.pathname.indexOf('history') > -1 && 'active'}`}
                    onClick={this.toHistory}
                  >
                    History
                  </button>
                </>
              )}
            </div>
            <div className="username-wrapper d-flex justify-content-center align-items-center">
              <div
                role="button"
                id="lg-avatar"
                className="d-usermenu"
                onClick={this.onOpenProfileModal}
                tabIndex={0}
              >
                <Avatar src={isGuest ? '' : authUser.avatar} />
                <p className="name--user">
                  <span>{authUserFullName}</span>
                  <ExpandMoreIcon style={{ fontSize: '28px', color: '#31c5c3' }} />
                </p>
              </div>
              <StyledModal
                className="profile-modal"
                open={openProfileModal}
                onClose={this.onCloseProfileModal}
                showCloseIcon
                padding={0}
                style={{}}
              >
                <Avatar
                  width={120}
                  height={120}
                  src={isGuest ? '' : authUser.avatar}
                  style={{
                    position: 'absolute',
                    top: -42,
                    transform: 'translateX(-50%)',
                    left: '50%',
                  }}
                />
                <p className="user--name">{isGuest ? 'Guest' : authUserFullName}</p>
                {!isGuest && <p className="user--email">{authUserEmail}</p>}
                {!isGuest && (
                  <button type="button" onClick={this.toProfile} className="button darkblue border medium">
                    View Profile
                  </button>
                )}
                <button type="button" className="button neutral border medium" onClick={this.handleLogout}>
                  Logout
                </button>
              </StyledModal>
            </div>
          </div>
          <h3 id="sm-title" className="title">
            {currentChurchTitle}
          </h3>
        </div>
      </nav>
    );
  }
}

DHeader.defaultProps = {
  authUserEmail: null,
  authUserFullName: null,
  authUser: null,
  ref: React.createRef(),
  currentChurchTitle: '',
  currentChurchLogo: null,
};

DHeader.propTypes = {
  ref: PropTypes.object,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  authUserEmail: PropTypes.string,
  authUserFullName: PropTypes.string,
  authUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    created: PropTypes.number.isRequired,
    profile: PropTypes.object.isRequired,
    avatar: PropTypes.string,
  }),
  // .isRequired,
  isGuest: PropTypes.bool.isRequired,
  currentChurchTitle: PropTypes.string,
  currentChurchLogo: PropTypes.string,
};

const mapStateToProps = param => {
  const {
    auth: { user, as },
    church: { title, avatar },
  } = param;
  return as === 'guest'
    ? {
        isGuest: true,
        currentChurchTitle: title,
        currentChurchLogo: avatar,
      }
    : {
        isGuest: false,
        authUser: user,
        authUserEmail: user ? user.email : null,
        authUserFullName: user ? `${user.profile.firstName} ${user.profile.lastName}` : null,
        currentChurchTitle: title,
        currentChurchLogo: avatar,
      };
};

export default withRouter(connect(mapStateToProps)(DHeader));
