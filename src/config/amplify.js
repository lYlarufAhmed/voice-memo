export const COGNITO_CONFIG = {
  identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID,
  region: process.env.REACT_APP_REGION,
  userPoolId: process.env.REACT_APP_USER_POOL_ID,
  userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID,
  mandatorySignIn: false,
};

// export const IOT_CONFIG = {
//   aws_pubsub_region: process.env.REACT_APP_REGION,
//   aws_pubsub_endpoint: process.env.REACT_APP_PUB_SUB_ENDPOINT,
// };

export const AMPLIFY_CONFIG = {
  signUpConfig: {
    hideAllDefaults: true,
    signUpFields: [
      {
        label: 'First name',
        key: 'family_name',
        required: true,
        displayOrder: 1,
        type: 'string',
      },
      {
        label: 'Last name',
        key: 'given_name',
        required: true,
        displayOrder: 2,
        type: 'string',
      },
      {
        label: 'Email',
        key: 'email',
        required: true,
        displayOrder: 3,
        type: 'string',
      },
      {
        label: 'Password',
        key: 'password',
        required: true,
        displayOrder: 4,
        type: 'password',
      },
    ],
  },
  usernameAttributes: 'email',
};
