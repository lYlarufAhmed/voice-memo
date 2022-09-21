import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  // , IconButton
} from '@material-ui/core';
// import { Tooltip } from 'components';

// import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import HonoredMemberStar from 'assets/images/groupstar_medium.png';
import { COUNTRIES } from 'config/supported_address';

const UserProfileDetails = ({ handleEPClick, user, editable }) => (
  <div className="u-profile">
    <div className="row up-prop">
      <Grid container spacing={2}>
        <Grid container item xs={12} md={6} spacing={2}>
          <Grid item xs={12} sm={5} md={5}>
            <div className="item-label">First Name:</div>
          </Grid>
          <Grid item xs={12} sm={7} md={7}>
            <div className="item-value">{user.profile.firstName || ''}</div>
          </Grid>
          <Grid item xs={12} sm={5} md={5}>
            <div className="item-label">Last Name:</div>
          </Grid>
          <Grid item xs={12} sm={7} md={7}>
            <div className="item-value">{user.profile.lastName || ''}</div>
          </Grid>
          <Grid item xs={12} sm={5} md={5}>
            <div className="item-label">Email Address:</div>
          </Grid>
          <Grid item xs={12} sm={7} md={7}>
            <div className="item-value">{user.email || ''}</div>
          </Grid>
          <Grid item xs={12} sm={5} md={5}>
            <div className="item-label">Occupation:</div>
          </Grid>
          <Grid item xs={12} sm={7} md={7}>
            <div className="item-value">{user.profile.occupation || ''}</div>
          </Grid>
        </Grid>
        <Grid container item xs={12} md={6} spacing={2}>
          <Grid item xs={12} sm={5} md={6}>
            <div className="item-label">Home Address:</div>
          </Grid>
          <Grid item xs={12} sm={7} md={6}>
            <div className="item-value">
              {`${user.contacts.address.address || ''}`}
              <br />
              {user.contacts.address.city && `${user.contacts.address.city},`}
              <span>&nbsp;</span>
              {`${user.contacts.address.state || ''} ${user.contacts.address.zip || ''}`}
              <br />
              {`${
                (
                  COUNTRIES.find(country => user.contacts.address.country === country.code) || {
                    country: user.contacts.address.country || '',
                  }
                ).country
              }`}
            </div>
          </Grid>
          <Grid item xs={12} sm={5} md={6}>
            <div className="item-label">Home Phone Number:</div>
          </Grid>
          <Grid item xs={12} sm={7} md={6}>
            <div className="item-value">{user.contacts.homePhone || ''}</div>
          </Grid>
          <Grid item xs={12} sm={5} md={6}>
            <div className="item-label">Cell Phone Number:</div>
          </Grid>
          <Grid item xs={12} sm={7} md={6}>
            <div className="item-value">{user.contacts.cellPhone || ''}</div>
          </Grid>
        </Grid>
      </Grid>
    </div>
    {user.profile.member.type === 'honored' && (
      <div>
        <div className="honored_member">
          <div className="honored_member_logo">
            <img src={HonoredMemberStar} alt="HonoredMember Star" />
          </div>
          <div className="honored_member_detail">
            <p className="hm-title">Honored Member</p>
            <p className="hm-subtitle">Position: {user.profile.member.position || ''}</p>
            <p className="hm-detail">{user.profile.member.description || ''}</p>
          </div>
        </div>
      </div>
    )}
    {editable && (
      <div className="up-editprofilebtn">
        <button type="button" className="button medium gray" onClick={handleEPClick}>
          Edit Profile
        </button>
      </div>
    )}
  </div>
);

UserProfileDetails.propTypes = {
  handleEPClick: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    email: PropTypes.string,
    profile: PropTypes.object.isRequired,
    contacts: PropTypes.object.isRequired,
  }).isRequired,
  editable: PropTypes.bool.isRequired,
  // showGivingHistory: PropTypes.bool.isRequired,
  // showPryerRequests: PropTypes.bool.isRequired,
  // prayers: PropTypes.shape({
  //   data: PropTypes.array.isRequired,
  //   isLoading: PropTypes.bool.isRequired,
  // }).isRequired,
  // gHistory: PropTypes.shape({
  //   history: PropTypes.array.isRequired,
  //   isLoading: PropTypes.number.isRequired,
  // }).isRequired,
  // groups: PropTypes.shape({
  //   data: PropTypes.array.isRequired,
  //   isLoading: PropTypes.bool.isRequired,
  // }).isRequired,
};

export default UserProfileDetails;
