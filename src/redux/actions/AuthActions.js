import { Auth } from 'aws-amplify';
import axios from 'axios';
import { api, logger, storage } from 'service';
import { BASE64_IMAGE_REGEXP } from 'config/regexrs';
import { fetchChurchRequest } from './ChurchActions';

export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const DELETE_CARD = 'DELETE_CARD';
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';
export const RECEIVE_USER = 'RECEIVE_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_USER_IMG = 'UPDATE_USER_IMG';
export const RECEIVE_USER_CUSTOMER = 'RECEIVE_USER_CUSTOMER';
export const CREATE_USER_CUSTOMER = 'CREATE_USER_CUSTOMER';
export const GUEST_LOGIN = 'GUEST_LOGIN';

const storeDataToStorage = (email, signUpdata) => {
  const saveData = { ...signUpdata };
  if (saveData.password) delete saveData.password;
  if (saveData.confirmPassword) delete saveData.confirmPassword;
  storage.setItem(`unverified_faithmo_signup_data[${email}]`, saveData);
};

export const registerUserAmplify = async (email, password, data) => {
  try {
    const { userConfirmed } = await Auth.signUp({
      username: email,
      password,
    });
    if (!userConfirmed) {
      storeDataToStorage(email, data);
      return false;
    }
    return false;
  } catch (error) {
    if (process.env.NODE_ENV === 'development' || process.env.REACT_APP_STAGE === 'development') {
      // enable for development
      if (error.code === 'UsernameExistsException') {
        storeDataToStorage(email, data);
        // return true;
      }
    }
    logger.warn('registerUserAmplify action', error);

    throw error;
  }
};

export const registerUserRequestAsGuest = user => async (_, getState) => {
  try {
    const {
      church: { id: churchID },
    } = getState();
    await api(`/guest/church/${churchID}/subscriber`, 'post', {
      email: user.email,
      profile: {
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    logger.warn('registerUserRequest action as guest', error);
    throw error;
  }
};

export const registerUserRequest = user => async (dispatch, getState) => {
  try {
    const {
      church: { id: churchID },
    } = getState();
    const { user: newUser } = await api(`/guest/user/email/${user.email.toLowerCase()}`);
    if (newUser && newUser.id) {
      await dispatch(subscribeUserRequest(newUser.id, churchID));
    } else {
      const { userID } = await api('/user', 'post', {
        email: user.email.toLowerCase(),
        profile: {
          firstName: user.firstName,
          lastName: user.lastName,
        },
      });
      await dispatch(subscribeUserRequest(userID, churchID));
    }
  } catch (error) {
    logger.warn('registerUserRequest action', error);
    throw error;
  }
};
export const subscribeUserRequest = (userID, churchID) => async () => {
  try {
    await api(`/church/${churchID}/subscribers/${userID}`, 'put');
    // dispatch({ type: RECEIVE_USER, payload: { id: userID, user } });
    logger.info('subscribeUserRequest action Feedback***');
  } catch (error) {
    logger.warn('subscribeUserRequest action', error);
    throw error;
  }
};

export const currentUserInfo = () => async (dispatch, getState) => {
  try {
    const info = await Auth.currentUserInfo();
    if (!info) {
      await dispatch({ type: GUEST_LOGIN });
      return null;
    }
    const {
      attributes: {
        email,
        // , firstName, lastName
      },
    } = info;

    let payload = {};
    let {
      church: { id: churchID },
    } = getState();
    logger.warn('we church here', churchID, window.location.host);
    if (!churchID) {
      const { church } = await dispatch(fetchChurchRequest(window.location.host.split('.')[0]), null);
      churchID = church.id;
    }
    const { user } = await api(`/user/email/${email}`);
    // const { user } = await api(`/church/${churchID}/subscribers/${ret.user.id}`);
    // logger.warn('got user', user.churches, churchID);
    if (user.churches?.includes(churchID)) {
      payload = {
        user,
        as: 'user',
      };
      if (churchID) payload.church = churchID;
      // else await dispatch(fetchChurchRequest(null, payload.church));

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload,
      });
      if (!payload.user.customerID) {
        const { profile } = payload.user;
        await dispatch(createCustomerRequest({ name: `${profile.firstName} ${profile.lastName}`, email }));
      }
    } else {
      // dispatch({ type: USER_LOGOUT_SUCCESS });
      throw Error('User is not subscribed to this church!');
    }

    return null;
  } catch (error) {
    logger.warn('currentUserInfo action', error);
    await dispatch({ type: GUEST_LOGIN });
    throw error;
  }
};

export const logout = () => async dispatch => {
  try {
    await Auth.signOut();
    storage.removeItem('faithmo_login');
    dispatch({
      type: USER_LOGOUT_SUCCESS,
    });
  } catch (error) {
    logger.warn('logout action', error);
  }
};

export const fetchCustomerStateRequest = () => async (dispatch, getState) => {
  const {
    auth: { user, church: churchID },
  } = getState();

  try {
    if (!user.customerID) {
      const { profile, email } = user;
      await dispatch(createCustomerRequest({ name: `${profile.firstName} ${profile.lastName}`, email }));
      // dispatch({ type: RECEIVE_USER_CUSTOMER, payload: { customer: null } });
      // return null;
    }
    const { customer } = await api(`/payments/church/${churchID}/customer/${user.customerID}`);
    dispatch({ type: RECEIVE_USER_CUSTOMER, payload: { customer } });
    return customer;
  } catch (error) {
    dispatch({ type: RECEIVE_USER_CUSTOMER, payload: { customer: null } });
    logger.warn('fetchCustomerStateRequest action', error);
    return null;
  }
};

export const createCustomerRequest = profile => async (dispatch, getState) => {
  const {
    // auth: { church: churchID },
    as,
    church: { id: churchID },
  } = getState();
  try {
    let customerID;
    if (as !== 'guest') {
      const { customer } = await api(`/guest/payments/church/${churchID}/customer`, 'post', profile);
      customerID = customer.id;
      dispatch({ type: CREATE_USER_CUSTOMER, payload: { customerID: customer.id } });
    } else {
      const { customer } = await api(`/payments/church/${churchID}/customer`, 'post', profile);
      customerID = customer.id;
    }
    return { customerID };
  } catch (e) {
    dispatch({ type: CREATE_USER_CUSTOMER, payload: { customerID: null } });
  }
  return {};
};

export const deleteCardRequest = (churchID, customerID, cardID) => async dispatch => {
  try {
    await api(`/payments/church/${churchID}/customer/${customerID}/paymentMethod/${cardID}`, 'delete');
  } catch (e) {
    logger.error(e);
  }
  await dispatch(fetchCustomerStateRequest());
};

export const fetchUserRequest = () => async (dispatch, getState) => {
  const {
    auth: { user },
  } = getState();

  try {
    const { user: userData } = await api(`/user/${user.id}`);
    dispatch({ type: RECEIVE_USER, payload: { user: userData } });
    return userData;
  } catch (error) {
    logger.warn('fetchUserRequest action', error);
    throw error;
  }
};

export const updateCustomerRequest = customerId => async (dispatch, getState) => {
  const {
    auth: { church: churchID, user },
    // church: { id },
  } = getState();
  await api(`/payments/church/${churchID}/customer/${customerId}`, 'put', {
    name: `${user.profile.firstName} ${user.profile.lastName}`,
    phone: user.contacts.cellPhone,
  });
};

export const updateUserRequest = data => async (dispatch, getState) => {
  // console.log(getState(), data);
  const {
    auth: { user, church: churchID },
    // church: { id },
  } = getState();

  const uUser = {
    contacts: data.contacts,
    profile: {
      ...data.profile,
      member: {
        ...data.profile.member,
        position: data.profile.member.type === 'honored' ? data.profile.member.position : null,
        description: data.profile.member.type === 'honored' ? data.profile.member.description : null,
      },
    },
  };
  if (data.unlinked) {
    uUser.email = data.email;
  }

  try {
    let updateCustomer = Promise.resolve();
    if (data.customerID) {
      updateCustomer = api(`/payments/church/${churchID}/customer/${data.customerID}`, 'put', {
        name: `${data.profile.firstName} ${data.profile.lastName}`,
        phone: data.contacts.cellPhone,
      });
    }

    await Promise.all([updateCustomer, api(`/user/${data.id}`, 'put', uUser)]);

    dispatch({
      type: UPDATE_USER,
      payload: { user: { ...uUser, ...user } },
    });
  } catch (error) {
    logger.warn('updateUserRequest action', error);
    throw error;
  }
};

export const updateUserAvatarRequest = image => async (dispatch, getState) => {
  const {
    auth: { user },
  } = getState();

  try {
    // console.log('in update user avatar Request', image);
    const data = image.replace(BASE64_IMAGE_REGEXP, '');
    let type = image.match(BASE64_IMAGE_REGEXP);
    type = type[1].toLowerCase();
    const { uploadURL, fullpath } = await api(`/user/${user.id}/avatar`, 'put', {
      type,
      encoding: 'base64',
    });
    await axios.put(uploadURL, Buffer.from(data, 'base64'), {
      headers: {
        'Content-Type': `image/${type}`,
      },
    });
    dispatch({
      type: UPDATE_USER_IMG,
      payload: {
        avatar: fullpath,
      },
    });
  } catch (error) {
    logger.warn('updateUserAvatarRequest action', error);
    throw error;
  }
};

export const deleteUserAvatarRequest = () => async (dispatch, getState) => {
  const {
    auth: { user },
  } = getState();

  try {
    await api(`/user/${user.id}/avatar`, 'delete');
    dispatch({
      type: UPDATE_USER_IMG,
      payload: {
        avatar: null,
      },
    });
  } catch (error) {
    logger.warn('deleteUserAvatarRequest action', error);
    throw error;
  }
};
