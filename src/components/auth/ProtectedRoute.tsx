import { ReactNode } from "react";
import cookieService from "../../services/cookieService";
import { Navigate } from "react-router-dom";


export default function ProtectedRoute({element}:{element:ReactNode}) {
    const token = cookieService.get('jwt');
  return token?element:<Navigate to={'/login'} />
}
