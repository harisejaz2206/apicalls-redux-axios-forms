import React from 'react';

const HomePage: React.FC = () => {
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
