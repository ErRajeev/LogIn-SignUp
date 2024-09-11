import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const auth = { token: true }; // now we have to make token as dynemic
  return <>{auth.token ? <Outlet /> : <Navigate to="/login" />}</>;
};

export default ProtectedRoutes;
