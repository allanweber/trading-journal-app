import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isoWeek from 'dayjs/plugin/isoWeek';
dayjs.extend(customParseFormat);
dayjs.extend(isoWeek);

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

export const displayDateExtended = (value) => {
  if (value) {
    const day = dayjs(value, 'YYYY-MM-DD HH:mm:ss');
    return `${day.format('MMMM D, HH:mm').toLocaleUpperCase()} ${day.format(
      'dddd'
    )}`;
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

export const periodToDates = (period) => {
  let begin;
  let end;
  if ('DAY' === period.aggregation) {
    begin = dayjs(period.time, 'YYYY-MM-DD').startOf('day');
    end = dayjs(period.time, 'YYYY-MM-DD').endOf('day');
  } else if ('WEEK' === period.aggregation) {
    const [year, week] = period.time.split('-');
    begin = dayjs().year(year).isoWeek(week).isoWeekday(1).startOf('day');
    end = dayjs().year(year).isoWeek(week).isoWeekday(7).endOf('day');
  } else {
    begin = dayjs(period.time, 'YYYY-MM').startOf('month');
    end = dayjs(period.time, 'YYYY-MM').endOf('month');
  }
  const from = begin.format('YYYY-MM-DD HH:mm:ss');
  const until = end.format('YYYY-MM-DD HH:mm:ss');
  return [from, until];
};
