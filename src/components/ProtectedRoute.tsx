import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: any) {
    const user = useSelector((state: any) => state.user);
    if (user.type === 1) {
      return <Navigate to="/" replace />;
    }
  
    return children;
  };