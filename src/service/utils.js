import moment from 'moment';

export const groupBy = key => array =>
  array.reduce((objectsByKeyValue, obj) => {
    const value = obj[key];
    /* eslint no-param-reassign: ["error", { "props": false }] */
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
    return objectsByKeyValue;
  }, {});

export const groupByProductID = groupBy('productID');

export const normalizeAmountValue = value => {
  if (!value) {
    return '';
  }
  const onlyNum = value.replace(/[^\d.]/g, '');
  const numArray = onlyNum.split('.');
  if (numArray.length >= 2) {
    if (numArray[1].length > 2) {
      return `${numArray[0]}.${numArray[1][0]}${numArray[1][1]}`;
    }
    return `${numArray[0]}.${numArray[1]}`;
  }
  return onlyNum;
};

export const toBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

export const daysLeft = date => {
  const dateEvent = moment(date);
  const days = dateEvent.diff(moment().startOf('day'), 'days', true);
  return Math.floor(days);
};

export const formatDateValueToCalendarValue = date =>
  moment(date).calendar(null, {
    lastWeek: '[Last] dddd, hh:mm A',
    lastDay: '[Yesterday], hh:mm A',
    sameDay: '[Today], hh:mm A',
    nextDay: '[Tomorrow], hh:mm A',
    nextWeek: '[Next] dddd, hh:mm A',
    sameElse: () => {
      const days = daysLeft(date);
      if (days > 0) return `[${days} days after], hh:mm A`;
      return `[${-days} days ago], hh:mm A`;
    },
  });

// type : datetime, date, date_long, time, currency
export const formatValue = (value, type) => {
  let ret = '';
  switch (type) {
    case 'datetime':
      ret = new Intl.DateTimeFormat(undefined, {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }).format(new Date(value));
      break;
    case 'date':
      ret = new Intl.DateTimeFormat(undefined, {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
      }).format(new Date(value));
      break;
    case 'date_long':
      ret = new Intl.DateTimeFormat(undefined, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(new Date(value));
      break;
    case 'time':
      ret = new Intl.DateTimeFormat(undefined, {
        hour: '2-digit',
        minute: '2-digit',
      }).format(new Date(value));
      break;
    case 'currency':
      ret = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(value);
      break;
    default:
      break;
  }

  return ret;
};

export const makeStringID = length => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const replaceAllStringFromObject = (entity, regExp, replacement) => {
  if (!entity || typeof entity !== 'object') {
    return entity;
  }

  const newEntity = Array.isArray(entity) ? [] : {};
  const keys = Object.keys(entity);

  for (let index = 0; index < keys.length; index += 1) {
    const property = keys[index];
    if (Object.prototype.hasOwnProperty.call(entity, property)) {
      let value = entity[property];

      if (
        Object.prototype.toString.call(value) === '[object Object]' ||
        Object.prototype.toString.call(value) === '[object Array]'
      ) {
        value = replaceAllStringFromObject(value, regExp, replacement);
      } else if (Object.prototype.toString.call(value) === '[object String]') {
        value = value.replace(regExp, replacement);
      }

      newEntity[property] = value;
    }
  }
  return newEntity;
};

export const replaceAllEmptyFromObject = entity => {
  if (!entity || typeof entity !== 'object') {
    return entity;
  }

  const newEntity = Array.isArray(entity) ? [] : {};
  const keys = Object.keys(entity);
  for (let index = 0; index < keys.length; index += 1) {
    const property = keys[index];
    if (Object.prototype.hasOwnProperty.call(entity, property)) {
      let value = entity[property];

      if (
        Object.prototype.toString.call(value) === '[object Object]' ||
        Object.prototype.toString.call(value) === '[object Array]'
      ) {
        value = replaceAllEmptyFromObject(value);
      } else if (value == null) {
        // skip null value
      } else if (value === undefined) {
        // skip undefined value
      } else if (value === '') {
        value = null;
      }

      if (value !== undefined) {
        if (Array.isArray(newEntity)) newEntity.push(value);
        else newEntity[property] = value;
      }
    }
  }
  return newEntity;
};

export const formatCellNumber = value => {
  if (value.length > 3 && !value.includes('-')) return `${value.slice(0, 3)}-${value.slice(3)}`;
  if (value.length > 6 && value[7] !== '-') return `${value.slice(0, 7)}-${value.slice(7)}`;
  return value;
};

export const calculateNextPaymentDate = (unixTimestamp, interval, intervalCount) => {
  const created = new Date(moment.unix(unixTimestamp)).getTime();
  const now = new Date().getTime();
  const elapsed = now - created;
  const NextElapsed = Math.ceil(elapsed / (interval * intervalCount));
  return new Date(now + NextElapsed);
};
export default {
  groupBy,
  groupByProductID,
  normalizeAmountValue,
  toBase64,
  formatDateValueToCalendarValue,
  formatValue,
  daysLeft,
  makeStringID,
  replaceAllStringFromObject,
  replaceAllEmptyFromObject,
  formatCellNumber,
};
