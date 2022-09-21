import React from 'react';
import PropTypes from 'prop-types';

import './style.css';
import { connect } from 'react-redux';
import FaithmoIcon from '../../assets/images/default_church.png';

const AuthWrapper = ({ children, data, church }) => (
  <div className="FaithmoAuth__wrapper">
    <div className="FaithmoAuth__left">
      <img className="FaithmoAuth__logo" src={church.avatar || FaithmoIcon} alt="Logo" />
      <h3 className="title">{church.title}</h3>
      <p className="FaithmoAuth__content">{data.description}</p>
      <div className="FaithmoAuth__badges">
        {data.appStoreUrls.map(store => (
          <a key={store.name} href={store.link} target="_blank" rel="noopener noreferrer">
            <img src={store.image} alt={store.name} className="FaithmoAuth__badge" />
          </a>
        ))}
      </div>
    </div>
    <div className="FaithmoAuth__right">{children}</div>
  </div>
);

AuthWrapper.defaultProps = {
  data: {
    logo: './logo.png',
    description:
      'Download the mobile app today to stay informed and connected. Available now on the App Store and Google Play.',
    termsLink: 'https://faithmo.org/terms',
    copyRight: 'Ⓒ 2021 Faithmo',
    appStoreUrls: [
      {
        name: 'Google Play',
        link: 'https://play.google.com/store',
        image: './google-play-badge.svg',
      },
      {
        name: 'Apple App Store',
        link: 'https://www.apple.com/app-store/',
        image: './apple-app-store-badge.svg',
      },
    ],
  },
  church: {},
};

AuthWrapper.propTypes = {
  children: PropTypes.any.isRequired,
  church: PropTypes.object,
  data: PropTypes.shape({
    logo: PropTypes.string,
    description: PropTypes.string,
    termsLink: PropTypes.string,
    copyRight: PropTypes.string,
    appStoreUrls: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        link: PropTypes.string,
        image: PropTypes.string,
      }),
    ),
  }),
};

const mapStateToProps = params => ({ church: params.church });

export default connect(mapStateToProps)(AuthWrapper);
