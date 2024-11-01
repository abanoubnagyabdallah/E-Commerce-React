import { Navigate } from "react-router-dom";
import cookieService from "../../services/cookieService";
import { ReactNode } from "react";


export default function ProtectedAuth({ element }: { element: ReactNode }) {
    const token = cookieService.get('jwt');
    return !token ? element : <Navigate to={'/'} />
}
