import { EMAIL_REGEXP } from 'config/regexrs';

const validate = values => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'First Name is required';
  }

  if (!values.lastName) {
    errors.lastName = 'Last Name is required';
  }

  if (!values.email) {
    errors.email = 'Personal Email Address is required';
  } else if (!EMAIL_REGEXP.test(values.email)) {
    errors.email = 'Personal Email Address is invalid';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 8) {
    errors.password = 'Password must have at least 8 characters';
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords must match';
  }

  return errors;
};

export default validate;
