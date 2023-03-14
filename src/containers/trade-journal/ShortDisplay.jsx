import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isoWeek from 'dayjs/plugin/isoWeek';
import { useEffect, useState } from 'react';

dayjs.extend(customParseFormat);
dayjs.extend(isoWeek);

export const ShortDisplay = ({ date, type }) => {
  const [formatted, setFormatted] = useState();

  useEffect(() => {
    if (type === 'DAY') {
      const day = dayjs(date, 'YYYY-MM-DD');
      setFormatted(
        `${day.format('MMM D, ').toLocaleUpperCase()} ${day.format('ddd')}`
      );
    } else if (type === 'WEEK') {
      setFormatted(`WEEK ${date.split('-')[1]}`);
    } else if (type === 'MONTH') {
      setFormatted(dayjs(date, 'YYYY-MM').format('MMMM').toLocaleUpperCase());
    } else if (type === 'MONTH_YEAR') {
      setFormatted(
        dayjs(date, 'YYYY-MM').format('MMMM, YYYY').toLocaleUpperCase()
      );
    } else if (type === 'YEAR') {
      setFormatted(date);
    } else if (type === 'DATE_HOUR') {
      const day = dayjs(date, 'YYYY-MM-DD HH:mm:ss');
      setFormatted(
        `${day.format('MMM D, HH:mm').toLocaleUpperCase()} ${day.format('ddd')}`
      );
    } else {
      setFormatted('INVALID TYPE');
    }
  }, [date, type]);

  return <label>{formatted}</label>;
};
