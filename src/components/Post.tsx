import React from 'react';
import { Link } from "react-router-dom";

export function PostHomePage() {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-gray-800 to-black">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h1 className="text-2xl font-semibold mb-6 text-center">Post Operations</h1>
                <div className="mb-4">
                    <Link to="/createpost" className="w-full bg-gradient-to-r from-purple-500 to-yellow-500 text-white p-2 rounded-md hover:from-pink-500 hover:to-indigo-500 transition duration-300 ease-in-out block text-center">Create Post</Link>
                </div>
                <div className="mb-4">
                    <Link to="/updatepost" className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white p-2 rounded-md hover:from-teal-500 hover:to-blue-500 transition duration-300 ease-in-out block text-center">Update Post</Link>
                </div>
                <div className="mb-4">
                    <Link to="/viewpost" className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white p-2 rounded-md hover:from-red-600 hover:to-orange-600 transition duration-300 ease-in-out block text-center">View Post</Link>
                </div>
                <div className="mb-4">
                    <Link to="/deletepost" className="w-full bg-gradient-to-r from-gray-500 to-black text-white p-2 rounded-md hover:from-gray-600 hover:to-black transition duration-300 ease-in-out block text-center">Delete Post</Link>
                </div>
            </div>
        </div>
    );
}
