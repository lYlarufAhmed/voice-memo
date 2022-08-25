import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logger, utils } from 'service';
import { IconButton } from '@material-ui/core';
import { Avatar, Loading, Tooltip } from 'components';
import {
  deleteUserAvatarRequest,
  fetchUserRequest,
  updateUserAvatarRequest,
  updateUserRequest,
} from 'redux/actions/AuthActions';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import UnlinkImg from 'assets/images/Disconnected_User.png';
import { withRouter } from 'react-router-dom';
import validate from './validate';
import UserProfileEdit from './UserProfileEdit';
import UserProfileDetails from './UserProfileDetails';
import './style.css';
import { formatCellNumber } from '../../service/utils';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmitting: false,
      editUser: null,
      user: null,
      errors: {},
      userImage: null,
    };
  }

  componentDidMount() {
    this.loadUserData();
  }

  loadUserData = async () => {
    const { dispatch, location } = this.props;

    dispatch(fetchUserRequest())
      .then(user =>
        this.setState({
          editUser: location.state && location.state.edit ? user : null,
          userImage: user.avatar,
          user,
          errors: {},
        }),
      )
      .catch(() => {
        this.goBack();
      });
  };

  onChangeImage = image => {
    const { dispatch } = this.props;
    const { user } = this.state;
    if (image) {
      dispatch(updateUserAvatarRequest(image, user.id))
        .then(() => {
          this.setState(() => ({ userImage: image }));
        })
        .catch(error => {
          logger.warn('onChangeImage on UserProfile', error);
        });
    } else if (image === null) {
      dispatch(deleteUserAvatarRequest(user.id))
        .then(() => {
          this.setState(() => ({ userImage: null }));
        })
        .catch(error => {
          logger.warn('onChangeImage on UserProfile', error);
        });
    }
  };

  handleEPClick = () => {
    const { user } = this.state;
    if (user) this.setState({ editUser: user, errors: {} });
  };

  handleEPSave = async () => {
    const { editUser } = this.state;
    const { dispatch } = this.props;
    try {
      this.setState(() => ({ isSubmitting: true }));
      const errors = validate(editUser);
      const errorCnt = Object.keys(errors).length;
      if (errorCnt) {
        this.setState({ errors, isSubmitting: false });
        return;
      }
      await dispatch(updateUserRequest(editUser));
      // console.info('edit user',editUser);
      this.setState(() => ({ user: editUser, editUser: null, isSubmitting: false }));
    } catch (error) {
      logger.warn('handleEPSave in UserProfile', error);
      this.setState(() => ({ isSubmitting: false }));
    }
  };

  handleEPCancel = () => {
    this.setState({ editUser: null, errors: {} });
  };

  handleChangeAddress = async (fullAddr, addrObj) => {
    if (addrObj === null) return;
    const { editUser, errors } = this.state;

    const { contacts } = editUser;
    const { address } = contacts;
    const updatedAddress = {
      ...address,
      address: `${addrObj.streetNumber ? `${addrObj.streetNumber} ` : ''}${addrObj.address}`,
      city: addrObj.city,
      state: addrObj.state.sn,
      country: addrObj.country.sn,
      zip: addrObj.zip,
    };
    const updatedContacts = { ...contacts, address: updatedAddress };

    this.setState({
      editUser: { ...editUser, contacts: updatedContacts },
      errors: {
        ...errors,
        address: undefined,
        city: undefined,
        state: undefined,
        country: undefined,
        zip: undefined,
      },
    });
  };

  handleChange = (name, value) => {
    const { editUser, errors } = this.state;
    const { profile, contacts } = editUser;

    switch (name) {
      case 'firstName':
      case 'lastName':
      case 'occupation':
      case 'notes':
      case 'ID': {
        const updatedProfile = { ...profile, [name]: value };
        this.setState({
          editUser: { ...editUser, profile: updatedProfile },
          errors: { ...errors, [name]: undefined },
        });
        break;
      }
      case 'type':
      case 'joinedDate':
      case 'position':
      case 'description': {
        const { member } = profile;
        const updateMember = { ...(member || {}), [name]: value };
        this.setState({
          editUser: {
            ...editUser,
            profile: {
              ...profile,
              member: updateMember,
            },
          },
          errors: { ...errors, [name]: undefined },
        });
        break;
      }
      case 'homePhone':
      case 'cellPhone': {
        const updatedContacts = { ...contacts, [name]: formatCellNumber(value) };
        this.setState({
          editUser: { ...editUser, contacts: updatedContacts },
          errors: { ...errors, [name]: undefined },
        });
        break;
      }
      case 'address':
      case 'city':
      case 'state':
      case 'country':
      case 'zip': {
        const { address } = contacts;
        const updatedAddress = { ...address, [name]: value };
        this.setState({
          editUser: {
            ...editUser,
            contacts: { ...contacts, address: updatedAddress },
          },
          errors: { ...errors, [name]: undefined },
        });
        break;
      }
      default:
        this.setState({
          editUser: { ...editUser, [name]: value },
          errors: { ...errors, [name]: undefined },
        });
    }
  };

  goBack = () => {
    const { history, location } = this.props;
    if (location.state && location.state.from) {
      history.goBack();
    } else {
      history.replace('/giving', { from: location.state ? location.state.from : undefined });
    }
  };

  render() {
    const { editUser, user, errors, userImage, isSubmitting } = this.state;
    const { gifts } = this.props;

    const renderMemberStatus = (type, joinedDate, isUnlinkedUser = false) => {
      let statusDetail = <span />;
      if (type === 'non-member') {
        statusDetail = <span>Non-Member</span>;
      } else if (type !== 'member' && type !== 'honored') {
        statusDetail = <span>Member Status Unknown</span>;
      } else {
        statusDetail = (
          <span>
            Member
            {joinedDate ? ` Since ${utils.formatValue(joinedDate, 'date')}` : ''}
          </span>
        );
      }

      return (
        <>
          {statusDetail}
          {isUnlinkedUser && (
            <Tooltip title="No FaithMo account is connected to this profile" placement="left-end">
              <IconButton style={{ position: 'absolute', top: 12, right: 18 }}>
                <img src={UnlinkImg} alt="Disconnected User" width={18} />
              </IconButton>
            </Tooltip>
          )}
        </>
      );
    };

    return (
      <>
        <Helmet title="User profile" />
        <div className="card-wrapper up-detail customWidth">
          {user ? (
            <>
              <div className="back">
                {editUser && (
                  <>
                    <ChevronLeftIcon />
                    <button type="button" onClick={this.handleEPCancel}>
                      Cancel
                    </button>
                  </>
                )}
              </div>
              <div className="avatar d-flex flex-column align-items-center">
                <Avatar
                  onChange={this.onChangeImage}
                  // style={{ marginTop: -80, marginLeft: 'auto', marginRight: 'auto' }}
                  width={100}
                  height={100}
                  editable
                  src={userImage}
                />
                <div className="member-status-detail">
                  {renderMemberStatus(
                    user.profile.member.type,
                    user.profile.member.joinedDate,
                    user.unlinked,
                  )}
                </div>
              </div>
              {editUser ? (
                <UserProfileEdit
                  user={editUser}
                  errors={errors}
                  isSubmitting={isSubmitting}
                  onChangeFullAddress={this.handleChangeAddress}
                  onSave={this.handleEPSave}
                  onChange={this.handleChange}
                />
              ) : (
                <UserProfileDetails
                  handleEPClick={this.handleEPClick}
                  editable
                  gHistory={{
                    history:
                      gifts.history && gifts.data
                        ? gifts.history
                            .filter(item => item.userID === user.id)
                            .map(gh => ({
                              ...gh,
                              productName: (
                                gifts.data.find(g => g.productID === gh.productID) || { title: 'No Title' }
                              ).title,
                            }))
                            .sort((a, b) => b.date - a.date)
                            .slice(0, 7)
                        : [],
                    isLoading: gifts.isLoading,
                  }}
                  user={user}
                />
              )}
            </>
          ) : (
            <div style={{ position: 'relative', height: 50, marginTop: 30 }}>
              <Loading />
            </div>
          )}
        </div>
        {/*<div className="FaithmoAuth__bottom">*/}
        {/*  <div />*/}
        {/*  <a className="FaithmoAuth__terms" href="https://faithmo.org/terms">*/}
        {/*    Terms & Conditions*/}
        {/*  </a>*/}
        {/*  <span className="FaithmoAuth__copyright">Ⓒ 2021 Faithmo</span>*/}
        {/*</div>*/}
      </>
    );
  }
}

UserProfile.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  gifts: PropTypes.shape({
    history: PropTypes.arrayOf(
      PropTypes.shape({
        userID: PropTypes.string.isRequired,
        productID: PropTypes.string.isRequired,
      }),
    ),
    data: PropTypes.arrayOf(
      PropTypes.shape({
        productID: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
      }),
    ),
    isLoading: PropTypes.number.isRequired,
  }).isRequired,
};

const mapStateToProps = ({ gifts, auth: { user, church } }, props) => ({
  gifts,
  user,
  church,
});

export default withRouter(connect(mapStateToProps)(UserProfile));
