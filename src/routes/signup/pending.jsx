import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import React from 'react';
import { Feedback } from '../../components/feedback';
import { Portal } from '../../containers/portal';

export const Pending = () => {
  return (
    <Portal icon={<ThumbUpAltOutlinedIcon />}>
      <Feedback
        header="Almost there, check your email to activate your account"
        subtitle="You can close this window or"
        to="/login"
        toLabel="Go back to login"
      ></Feedback>
    </Portal>
  );
};
