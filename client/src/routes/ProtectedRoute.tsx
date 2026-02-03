// role based route protection
import type { JSX } from "react";
import { Navigate } from "react-router-dom";
import { getRole, getToken } from "../services/token.service";

const ProtectedRoute = ({ roles, children}: {roles: string[]; children: JSX.Element}) => {
    const token = getToken();
    const role = getRole();

    if (!token) {
        return <Navigate to="/login"/>
    }
    if (!role || !roles.includes(role)) {
        return <Navigate to="/unauthorized"/>
    }
    return children;
}

export default ProtectedRoute;