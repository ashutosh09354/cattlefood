import { Navigate } from "react-router-dom";
import { useStore } from "../context/StoreContext.jsx";

export default function ProtectedRoute({ children }) {
  const { user } = useStore();
  return user ? children : <Navigate to="/login" replace />;
}
