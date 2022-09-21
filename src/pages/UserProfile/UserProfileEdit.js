import React from 'react';
import PropTypes from 'prop-types';
import { PlaceAutoComplete, Loading } from 'components';
import { COUNTRIES, STATES } from 'config/supported_address';
import Select from '@material-ui/core/Select';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};
const UserProfileEdit = ({ user, onSave, onChange, onChangeFullAddress, errors, isSubmitting }) => (
  <div className="u-profile-edit">
    <div className="row upe-prop">
      <div className="col-lg-6 upe-prop-left">
        <div className="form-group row">
          <label htmlFor="upe-firstname" className="col-md-5 form-label">
            First Name:
          </label>
          <div className="col-md-7">
            <input
              className="form-control"
              type="text"
              value={user.profile.firstName || ''}
              onChange={e => onChange('firstName', e.target.value)}
              id="upe-firstname"
            />
            {errors.firstName && <span className="helper-text error">{errors.firstName}</span>}
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="upe-lastname" className="col-md-5 form-label">
            Last Name:
          </label>
          <div className="col-md-7">
            <input
              className="form-control"
              type="text"
              value={user.profile.lastName || ''}
              onChange={e => onChange('lastName', e.target.value)}
              id="upe-lastname"
            />
            {errors.lastName && <span className="helper-text error">{errors.lastName}</span>}
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="upe-occupation" className="col-md-5 form-label">
            Occupation:
          </label>
          <div className="col-md-7">
            <input
              className="form-control"
              type="text"
              value={user.profile.occupation || ''}
              onChange={e => onChange('occupation', e.target.value)}
              id="upe-occupation"
            />
            {errors.occupation && <span className="helper-text error">{errors.occupation}</span>}
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="upe-email" className="col-md-5 form-label">
            Email Address:
          </label>
          <div className="col-md-7">
            <input
              className="form-control"
              type="email"
              value={user.email || ''}
              onChange={e => onChange('email', e.target.value)}
              id="upe-email"
              readOnly={!user.unlinked}
            />
            {errors.email && <span className="helper-text error">{errors.email}</span>}
          </div>
        </div>
        <div className="form-group row upe-homePhone-Wrapper">
          <label htmlFor="upe-homePhone" className="col-md-5 form-label">
            Home Number:
          </label>
          <div className="col-md-7">
            <input
              className="form-control"
              type="text"
              value={user.contacts.homePhone || ''}
              onChange={e => onChange('homePhone', e.target.value)}
              id="upe-homePhone"
            />
            {errors.homePhone && <span className="helper-text error">{errors.homePhone}</span>}
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="upe-cellPhone" className="col-md-5 form-label">
            Cell Number:
          </label>
          <div className="col-md-7">
            <input
              className="form-control"
              type="text"
              value={user.contacts.cellPhone || ''}
              onChange={e => onChange('cellPhone', e.target.value)}
              id="upe-cellPhone"
            />
            {errors.cellPhone && <span className="helper-text error">{errors.cellPhone}</span>}
          </div>
        </div>
      </div>
      <div className="col-lg-6 upe-prop-right">
        <label htmlFor="Address1">Address:</label>
        <div className="form-group">
          <PlaceAutoComplete
            value={user.contacts.address.address || ''}
            onChange={v => onChange('address', v)}
            onSelect={onChangeFullAddress}
            inputProps={{
              id: 'Address1',
              className: 'form-control address-control',
              placeholder: 'Street Address',
            }}
          />
          {errors.address && <span className="helper-text error">{errors.address}</span>}
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control address-control"
            id="city"
            placeholder="City"
            value={user.contacts.address.city || ''}
            onChange={e => onChange('city', e.target.value)}
          />
          {errors.city && <span className="helper-text error">{errors.city}</span>}
        </div>
        <div className="form-group">
          <FormControl fullWidth>
            <Select
              variant="filled"
              labelId="state"
              value={user.contacts.address.state || ''}
              disableUnderline
              MenuProps={MenuProps}
              IconComponent={ExpandMoreIcon}
              onChange={e => onChange('state', e.target.value)}
            >
              {(STATES || []).map(v => (
                <MenuItem key={v.abbreviation} value={v.abbreviation}>
                  {v.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {errors.state && <span className="helper-text error">{errors.state}</span>}
        </div>
        <div className="form-group">
          <FormControl fullWidth>
            <Select
              variant="filled"
              labelId="country"
              value={user.contacts.address.country}
              disableUnderline
              MenuProps={MenuProps}
              IconComponent={ExpandMoreIcon}
              onChange={e => onChange('country', e.target.value)}
            >
              {(COUNTRIES || []).map(v => (
                <MenuItem key={v.code} value={v.code}>
                  {v.country}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {errors.country && <span className="helper-text error">{errors.country}</span>}
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control address-control"
            placeholder="Zip"
            value={user.contacts.address.zip || ''}
            onChange={e => onChange('zip', e.target.value)}
          />
          {errors.zip && <span className="helper-text error">{errors.zip}</span>}
        </div>
      </div>
    </div>
    <div className="upe-b-savebtn">
      {isSubmitting ? (
        <div style={{ position: 'relative', height: 50 }}>
          <Loading />
        </div>
      ) : (
        <button type="button" className="button medium gray" onClick={onSave}>
          Save Changes
        </button>
      )}
    </div>
  </div>
);

UserProfileEdit.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    email: PropTypes.string,
    profile: PropTypes.object.isRequired,
    contacts: PropTypes.object.isRequired,
    unlinked: PropTypes.bool,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onChangeFullAddress: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};

export default UserProfileEdit;
