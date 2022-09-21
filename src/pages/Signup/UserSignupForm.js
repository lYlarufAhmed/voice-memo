import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { Loading } from 'components';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { InputComponent } from '../Giving/InputComponent';

const UserSignupForm = ({ handleSubmit, isSubmitting }) => (
  <Formik
    initialValues={{
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    }}
    validationSchema={Yup.object().shape({
      firstName: Yup.string().required('First Name is required!'),
      lastName: Yup.string().required('Last Name is required!'),
      email: Yup.string().required('Email is required!'),
      password: Yup.string().required('Password is required!'),
      confirmPassword: Yup.string()
        .required('Password is required!')
        .test('password-match', 'Passwords must match', function (value) {
          // eslint-disable-next-line react/no-this-in-sfc
          return this.parent.password === value;
        }),
    })}
    onSubmit={async values => {
      handleSubmit(values);
    }}
  >
    <Form>
      <Grid container spacing={2} style={{ gap: '2rem' }}>
        <Grid item xs={12} className="Section__sectionHeader">
          <span className="Section__sectionHeaderContent">Sign Up</span>
        </Grid>
        <Grid item xs={12}>
          <Grid container style={{ gap: '2rem' }}>
            <Grid item xs={12} sm={5}>
              <InputComponent name="firstName" label="First Name" />
            </Grid>
            <Grid item xs={12} sm={5}>
              <InputComponent name="lastName" label="Last Name" />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <InputComponent name="email" label="Email" />
        </Grid>
        <Grid item xs={12}>
          <InputComponent name="password" type="password" label="Password" />
        </Grid>
        <Grid item xs={12}>
          <InputComponent name="confirmPassword" type="password" label="Re-enter Password" />
        </Grid>
      </Grid>
      {isSubmitting ? (
        <div style={{ position: 'relative', height: 56, width: '100%' }}>
          <Loading />
        </div>
      ) : (
        <button
          type="submit"
          className="button medium gray"
          style={{ display: 'block', margin: '20px auto 0px' }}
        >
          Submit
        </button>
      )}
    </Form>
  </Formik>
);

UserSignupForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};

export default UserSignupForm;
