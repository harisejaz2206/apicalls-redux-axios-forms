import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Navigate } from 'react-router-dom';
import { RootState } from '../rootReducer';

type AuthRouteProps = {
    element: React.ReactElement;
    path: string;
};

export const AuthRoute: React.FC<AuthRouteProps> = ({ element, path }) => {
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn); // Adjust based on your state structure

    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }

    return <Route path={path} element={element} />;
};
