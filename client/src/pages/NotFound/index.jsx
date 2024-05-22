import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary-500">404</h1>
        <p className="text-2xl font-semibold text-gray-700 mt-4">
          Page Not Found
        </p>
        <p className="text-gray-500 mt-2">
          The page you are looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="inline-block bg-primary-500 text-white py-2 px-4 rounded-md mt-6 hover:bg-primary-600 transition-colors duration-300"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
