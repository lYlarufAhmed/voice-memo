import React from 'react';
// these screens are not used on auth flow
import { Greetings, SignUp, TOTPSetup } from 'aws-amplify-react';
import {
  ConfirmSignIn,
  ConfirmSignUp,
  ForgotPassword,
  Loading,
  RequireNewPassword,
  SignIn,
  VerifyContact,
} from 'components/Auth';
import { AMPLIFY_CONFIG } from 'config/amplify';

export default {
  includeGreetings: false,
  authenticatorComponents: [
    <Greetings />,
    <SignIn />,
    <ConfirmSignIn />,
    <RequireNewPassword />,
    <SignUp />,
    <ConfirmSignUp />,
    <VerifyContact />,
    <ForgotPassword />,
    <TOTPSetup />,
    <Loading />,
  ],
  federated: null,
  theme: {
    container: {
      width: '100%',
      // height: '100%',
    },
  },
  ...AMPLIFY_CONFIG,
};
