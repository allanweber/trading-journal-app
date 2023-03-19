import { Route, Routes as ReactRoutes } from 'react-router-dom';
import { Dashboard } from '../../pages/dashboard';
import { FirstJournal } from '../../pages/journals/FirstJournal';
import { Journals } from '../../pages/journals/Journals';
import { ChangePassword } from '../../pages/password/ChangePassword';
import { RequestPassword } from '../../pages/password/RequestPassword';
import { SignIn } from '../../pages/signin';
import { SignUp } from '../../pages/signup';
import { Strategies } from '../../pages/strategies/Strategies';
import { AllEntries } from '../../pages/trades/AllEntries';
import { Calendar } from '../../pages/trades/Calendar';
import { Journal } from '../../pages/trades/Journal';
import { VerifyEmail } from '../../pages/verify';
import { PrivateRoute } from './PrivateRoute';

export const Routes = () => {
  return (
    <ReactRoutes>
      <Route path="/login" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/email-verified" element={<VerifyEmail />} />
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
