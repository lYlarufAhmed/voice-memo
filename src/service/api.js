import axios from 'axios';
import { Auth } from 'aws-amplify';
import { ASSETS_CDN, ASSETS_PREFIX_REGEXP } from 'config/assets';
import logger from './logger';
import { replaceAllEmptyFromObject, replaceAllStringFromObject } from './utils';

const baseApi = axios.create({
  baseURL: process.env.REACT_APP_BACK_SERVER,
  timeout: 30000,
});

/* eslint no-param-reassign: ["error", { "props": false }] */

baseApi.interceptors.request.use(
  async config => {
    // Do something before request is sent, like we're inserting a autherization header
    try {
      const {
        idToken: { jwtToken },
      } = await Auth.currentSession();
      config.headers.Authorization = `Bearer ${jwtToken}`;
    } catch (error) {
      // ignore
    }

    if (config.data) {
      config.data = replaceAllEmptyFromObject(config.data);
    }

    return config;
  },
  error => {
    // Do something with request error
    logger.error(error, 'request interceptor');
    return Promise.reject(error);
  },
);

baseApi.interceptors.response.use(
  response => {
    let resData = response.data;
    if (resData) {
      resData = replaceAllStringFromObject(response.data, ASSETS_PREFIX_REGEXP, `${ASSETS_CDN}/`); // replace `asset-image:` to assets cdn url.
    }
    return resData;
  },
  error => {
    // Do something with response error

    logger.error(error, 'before modifying');
    if (error.response?.data) {
      if (error.response.data.reason) error.message = error.response.data.reason;
      else if (error.response.data.message) error.message = error.response.data.message;
    }
    logger.error('response interceptor', error, error.message);
    return Promise.reject(error);
  },
);

const api = async (suburl, method = 'get', data = null, contentType = 'application/json') => {
  if (!['get', 'put', 'post', 'delete'].includes(method)) {
    throw new Error('not implemented');
  }

  const resData = await baseApi({
    method,
    url: suburl,
    data,
    headers: {
      'Content-Type': contentType,
    },
  });

  logger.debug(method, suburl, resData);

  return resData;
};

export default api;
