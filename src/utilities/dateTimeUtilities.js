import dayjs from 'dayjs';

const API_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const DISPLAY_FORMAT_DATE_TIME = 'DD/MM/YYYY HH:mm';
const DISPLAY_FORMAT_DATE = 'DD/MM/YYYY';

export const isDateValid = (value) => {
  if (value === undefined || value === null) {
    return false;
  }
  return dayjs(value.toString()).isValid();
};

export const apiFormat = (value) => {
  if (value) {
    return dayjs(value).format(API_FORMAT);
  } else {
    return undefined;
  }
};

export const displayDate = (value) => {
  if (value) {
    return dayjs(value).format(DISPLAY_FORMAT_DATE);
  } else {
    return null;
  }
};

export const displayDateTime = (value) => {
  if (value) {
    return dayjs(value).format(DISPLAY_FORMAT_DATE_TIME);
  } else {
    return null;
  }
};
