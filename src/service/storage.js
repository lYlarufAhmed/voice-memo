import logger from './logger';

export function setItem(key, value) {
  try {
    let string = JSON.stringify(value);
    string = btoa(string);
    localStorage.setItem(key, string);
    return true;
  } catch (error) {
    logger.error(error);
    return false;
  }
}

export function getItem(key) {
  try {
    let string = localStorage.getItem(key);
    if (!string) return null;
    string = atob(string);
    return JSON.parse(string);
  } catch (error) {
    logger.error(error);
    return null;
  }
}

export function removeItem(key) {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    logger.error(error);
    return false;
  }
}

export default {
  setItem,
  getItem,
  removeItem,
};
