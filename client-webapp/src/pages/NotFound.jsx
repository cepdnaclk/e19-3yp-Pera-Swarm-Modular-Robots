import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundpage(){
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
          <h1 className="text-6xl font-bold">404</h1>
          <p className="mt-4 text-xl">Sorry, the page you are looking for does not exist.</p>
          <Link to="/" className="mt-8 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Go to Home Page
          </Link>
        </div>
      );
}

export default NotFoundpage;