export const EMAIL_REGEXP =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
export const PHONE_REGEXP = /^\d\d\d-\d\d\d-\d\d\d\d$/;

export const STREET_ADDRESS_REGEXP =
  /^\s*(?:(?:\d+(?:\x20+\w+\.?)+(?:(?:\x20+STREET|ST|DRIVE|DR|AVENUE|AVE|ROAD|RD|LOOP|COURT|CT|CIRCLE|LANE|LN|BOULEVARD|BLVD)\.?)?)|(?:(?:P\.\x20?O\.|P\x20?O)\x20*Box\x20+\d+)|(?:General\x20+Delivery)|(?:C[\\/]O\x20+(?:\w+\x20*)+))$/;
export const ZIP_CODE_REGEXP = /^\d\d\d\d\d$/;

export const BASE64_IMAGE_REGEXP = /^data:image\/(\w+);base64,/;
export const TIMESTAMP_REGEXP = /^\d{1,13}$/;

export const CREDIT_CARD_NUMBER_REGEXP =
  /^\d\d\d\d \d\d\d\d \d\d\d\d \d\d\d\d$|^\d\d\d\d \d\d\d\d\d\d \d\d\d\d\d$|^\d\d\d\d \d\d\d\d\d\d \d\d\d\d$|\d{14,16}/;
export const CREDIT_CARD_CVC_REGEXP = /^\d{3,4}$/;

export const PASSWORD_REGEXP = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g;
export const CODE_REGEXP = /^\d\d\d\d\d\d$/;
