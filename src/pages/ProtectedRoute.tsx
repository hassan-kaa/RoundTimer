import { Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/authContext";
import { ReactNode } from "react";

const ProtectedRoute = ({ element }: { element: ReactNode }) => {
  const { user } = useAuthContext();
  return user ? element : <Navigate to="/login" />;
};
export default ProtectedRoute;
