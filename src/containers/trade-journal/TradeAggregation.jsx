import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isoWeek from 'dayjs/plugin/isoWeek';
import { useEffect, useState } from 'react';

dayjs.extend(customParseFormat);
dayjs.extend(isoWeek);

export const TradeAggregation = ({ journal, period, onChange }) => {
  const [from, setFrom] = useState();
  const [until, setUntil] = useState();

  useEffect(() => {
    if (period) {
      console.log(period.time);
      let beginning;
      let end;
      if ('DAY' === period.aggregation) {
        beginning = dayjs(period.time, 'YYYY-MM-DD').startOf('day');
        end = dayjs(period.time, 'YYYY-MM-DD').endOf('day');
      } else if ('WEEK' === period.aggregation) {
        const [year, week] = period.time.split('-');
        beginning = dayjs().year(year).isoWeek(week).day(1).startOf('day');
        end = dayjs().year(year).isoWeek(week).day(7).endOf('day');
      } else {
        beginning = dayjs(period.time, 'YYYY-MM').startOf('month');
        end = dayjs(period.time, 'YYYY-MM').endOf('month');
      }
      setFrom(beginning.format('YYYY-MM-DD HH:mm:ss'));
      setUntil(end.format('YYYY-MM-DD HH:mm:ss'));
    }
  }, [period]);

  return (
    <div>
      <div>
        <label>{from}</label>
      </div>
      <div>
        <label>{until}</label>
      </div>
    </div>
  );
};
