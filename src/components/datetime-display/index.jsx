import { Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

export const DateTimeDisplay = ({ date }) => {
  const [dt, setDt] = useState();
  const [time, setTime] = useState();

  useEffect(() => {
    setDt(dayjs(date).format('MMM D YYYY').toLocaleUpperCase());
  }, [date]);

  useEffect(() => {
    setTime(dayjs(date).format('ddd, hh:mm A').toLocaleUpperCase());
  }, [date]);

  if (!date) return <div></div>;

  return (
    <div>
      <Typography fontSize="1rem" fontWeight={600}>
        {dt}
      </Typography>
      <Typography fontSize="0.8rem" fontStyle="italic">
        {time}
      </Typography>
    </div>
  );
};
