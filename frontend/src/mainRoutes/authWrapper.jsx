import { useContext } from "react";
import { context } from "../wrapper";
import { Navigate } from "react-router-dom";

const AuthWrapper = ({ children }) => {
  const [user] = useContext(context);

  return user ? children : <Navigate to="/login" />;
};

export default AuthWrapper;
