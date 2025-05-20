import { Navigate, Outlet } from "react-router-dom";
const PrivateRoute = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login/admin" />;
  }

  return <Outlet />; // This renders the child components (like the dashboard)
};

export default PrivateRoute;
