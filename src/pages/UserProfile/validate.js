import { STATES } from 'config/supported_address';
import {
  EMAIL_REGEXP,
  PHONE_REGEXP,
  STREET_ADDRESS_REGEXP,
  TIMESTAMP_REGEXP,
  ZIP_CODE_REGEXP,
} from 'config/regexrs';

const validate = (values, emailDuplicateStatus) => {
  const errors = {};

  if (!values.profile.firstName) {
    errors.firstName = 'Missing';
  }
  if (!values.profile.lastName) {
    errors.lastName = 'Missing';
  }
  if (values.email) {
    if (!EMAIL_REGEXP.test(values.email)) {
      errors.email = 'Incorrect Format';
    } else if (emailDuplicateStatus === 'duplicated_f') {
      errors.email = 'Duplicate Email - email already exists on your upload form';
    } else if (emailDuplicateStatus) {
      // emailStatus === 'duplicated_p'
      errors.email = 'Duplicate Email - email is already assigned to an existing user';
    }
  }
  if (values.contacts.cellPhone && !PHONE_REGEXP.test(values.contacts.cellPhone)) {
    errors.cellPhone = 'Phone number structure should be ###-###-####';
  }
  if (values.contacts.homePhone && !PHONE_REGEXP.test(values.contacts.homePhone)) {
    errors.homePhone = 'Phone number structure should be ###-###-####';
  }
  if (!values.profile.member.type) {
    errors.type = 'Select member type.';
  } else if (values.profile.member.type === 'honored') {
    if (!values.profile.member.position) {
      errors.position = 'Position is required';
    }
  }
  if (values.profile.member.joinedDate) {
    if (!TIMESTAMP_REGEXP.test(values.profile.member.joinedDate)) {
      errors.joinedDate = 'Invalid Date.';
    }
  }
  if (values.contacts.address.address && !STREET_ADDRESS_REGEXP.test(values.contacts.address.address)) {
    errors.address = 'Bad street address structure';
  }
  if (
    values.contacts.address.state &&
    !STATES.find(s => s.abbreviation === values.contacts.address.state.toUpperCase())
  ) {
    errors.state = 'Not valid 2 digit state code';
  }
  if (values.contacts.address.zip && !ZIP_CODE_REGEXP.test(values.contacts.address.zip)) {
    errors.zip = 'Invalid zip code structure';
  }
  return errors;
};

export default validate;
