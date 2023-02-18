import { Navigate, Outlet } from 'react-router-dom';
import { useApplication } from '../hooks/useApplication';

export function PrivateRoute() {
  const { user } = useApplication();

  return (
    user ? <Outlet /> : <Navigate to={"/"} />
  )
}
