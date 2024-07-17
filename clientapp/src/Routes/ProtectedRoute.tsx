import React, { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "../Context/useAuth";

interface IProps {
    children: ReactNode;
}

const ProtectedRoute = ({ children }: IProps) => {
    const location = useLocation();
    const { isLoggedIn } = useAuth();

    return isLoggedIn() ? <>{children}</> : <Navigate to="/login" state={{ from: location }} replace />;
};

export default ProtectedRoute;
