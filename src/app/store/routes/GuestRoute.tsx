import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Navigate } from 'react-router-dom';
import { RootState } from '../rootReducer';

type GuestRouteProps = {
    element: React.ReactElement;
    path: string;
};

export const GuestRoute: React.FC<GuestRouteProps> = ({ element, path }) => {
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn); // Adjust based on your state structure

    if (isLoggedIn) {
        return <Navigate to="/home" />;
    }

    return <Route path={path} element={element} />;
};
