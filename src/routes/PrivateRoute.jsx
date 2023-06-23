import { Navigate, Outlet } from 'react-router-dom';
import { useAuthState } from '../context/UserContext';

export const PrivateRoute = () => {
  const { user } = useAuthState();
  if (user) return <Outlet />;

  return <Navigate to="/login" />;
};
