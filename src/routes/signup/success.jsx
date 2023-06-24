import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import React from 'react';
import { Feedback } from '../../components/feedback';
import { Portal } from '../../containers/portal';

export const Success = () => {
  return (
    <Portal icon={<ThumbUpAltOutlinedIcon />}>
      <Feedback
        header="Thank you for creating your account"
        to="/login"
        toLabel="Your user was successfully created, go to login"
      ></Feedback>
    </Portal>
  );
};
