import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';

export const Duration = ({ start, end }) => {
  dayjs.extend(relativeTime);
  dayjs.extend(duration);

  const date1 = dayjs(start);
  const date2 = dayjs(end);

  let hours = date2.diff(date1, 'minutes');

  return <div>{dayjs.duration(hours, 'minutes').humanize()}</div>;
};
