import { Routes as ReactRoutes, Route } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { Dashboard } from './dashboard';
import { Journals } from './journals';
import { FirstJournal } from './journals/FirstJournal';
import { ChangePassword } from './password/ChangePassword';
import { RequestPassword } from './password/RequestPassword';
import { SignIn } from './signin';
import { SignUp } from './signup';
import { Pending } from './signup/pending';
import { Success } from './signup/success';
import { Strategies } from './strategies/Strategies';
import { AllEntries } from './trades/AllEntries';
import { Calendar } from './trades/Calendar';
import { Journal } from './trades/Journal';
import { VerifyEmail } from './verify';
import { VerifyAgain } from './verify/verify-again';

export const Routes = () => {
  return (
    <ReactRoutes>
      <Route path="/login" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/register/success" element={<Success />} />
      <Route path="/register/pending" element={<Pending />} />
      <Route path="/email-verified" element={<VerifyEmail />} />
      <Route path="/email-verified/again" element={<VerifyAgain />} />
      <Route path="/forgot-password" element={<RequestPassword />} />
      <Route path="/change-password" element={<ChangePassword />} />
      <Route path="/" element={<PrivateRoute />}>
        <Route path="" element={<Dashboard />} />
      </Route>
      <Route path="/journals" element={<PrivateRoute />}>
        <Route path="" element={<Journals />} />
      </Route>
      <Route path="/first-journal" element={<PrivateRoute />}>
        <Route path="" element={<FirstJournal />} />
      </Route>
      <Route path="/journal" element={<PrivateRoute />}>
        <Route path="" element={<Journal />} />
      </Route>
      <Route path="/entries" element={<PrivateRoute />}>
        <Route path="" element={<AllEntries />} />
      </Route>
      <Route path="/calendar" element={<PrivateRoute />}>
        <Route path="" element={<Calendar />} />
      </Route>
      <Route path="/strategies" element={<PrivateRoute />}>
        <Route path="" element={<Strategies />} />
      </Route>
    </ReactRoutes>
  );
};
