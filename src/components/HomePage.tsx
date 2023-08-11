import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store/rootReducer';
import { Navigate } from 'react-router-dom';

const HomePage: React.FC = () => {

    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold mb-4">Welcome to the Home Page</h1>
            <p className="text-lg mb-2">
                You have successfully logged in. Here you can explore your app's main features.
            </p>
            <div className="flex flex-wrap">
                {/* Your main content here, e.g. cards, links to other sections, etc. */}
            </div>
        </div>
    );
};

export default HomePage;
