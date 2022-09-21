import React from 'react';
import { Loading } from 'aws-amplify-react';
import LoadingComponent from '../Loading';
import AuthWrapper from './wrapper';

class FaithmoLoading extends Loading {
  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  showComponent(_theme) {
    return (
      <AuthWrapper>
        <div className="Form__formContainer">
          <div className="Section__sectionBody">
            <LoadingComponent />
          </div>
        </div>
      </AuthWrapper>
    );
  }
}

export default FaithmoLoading;
