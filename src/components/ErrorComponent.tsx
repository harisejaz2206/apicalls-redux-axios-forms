import React from 'react';

type ErrorProps = {
    message?: string;
};

const ErrorComponent: React.FC<ErrorProps> = ({ message }) => {
    return message ? (
        <p className="text-red-500 text-xs font-semibold italic border-l-4 border-red-400 bg-red-50 px-4 py-2 rounded gap-x-0.5">
            {message}
        </p>
    ) : null;
};

export default ErrorComponent;