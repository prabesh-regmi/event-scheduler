import React from "react";
import { useNavigate } from "react-router-dom";

function UnauthorizedPage() {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div className="min-h-[80vh] bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Unauthorized Access
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          You do not have permission to access this page.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <p className="text-gray-700">
            If you believe this is a mistake, please contact the administrator
            for assistance.
          </p>
          <div className="mt-6 w-full flex justify-center">
            <button
              onClick={handleBack}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UnauthorizedPage;
