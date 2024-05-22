import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import persistStore from "redux-persist/es/persistStore";
import { store } from "../../../redux/store";
import { logoutHandler } from "../../../services/handlePostRequest";
import { logout } from "../../../redux/slices/loginSlice";
import ErrorMessage from "../ErrorMessage";
import SubmitSpinner from "../SubmitSpinner";

function LogoutConformationModal({ onClose }) {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    setIsLoading(true);
    const isLogout = await logoutHandler();
    if (isLogout === true) {
      dispatch(logout());
      persistStore(store).purge();
      navigate("/login");
      onClose();
    } else {
      setMessage(isLogout.message);
    }
    setIsLoading(false);
  };
  return (
    <div className="px-8 bg-white rounded-lg shadow">
      <button
        type="button"
        className="absolute top-2 right-2 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
        onClick={() => onClose()}
      >
        <svg
          aria-hidden="true"
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
        <span className="sr-only">Close modal</span>
      </button>
      <div className="py-6 text-center">
        <div className="px-8">
          <svg
            aria-hidden="true"
            className="mx-auto mb-2 text-gray-400 w-14 h-14"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <h3 className="mb-5 text-lg font-normal text-gray-500">
            Are you sure you want to logout?
          </h3>
        </div>
        <div className="my-3">
          <ErrorMessage message={message} />
        </div>
        <div className="flex justify-between gap-3">
          <div className="flex-grow flex">
            <button
              onClick={handleLogout}
              className="border border-red-700 w-full py-2 rounded-full text-white bg-red-500 hover:bg-red-700 hover:shadow-lg"
            >
              {isLoading ? (
                <div className="flex justify-center">
                  <SubmitSpinner className="w-8 text-white animate-spin" />
                </div>
              ) : (
                <span>Yes</span>
              )}
            </button>
          </div>
          <div className="flex-grow">
            <button
              onClick={() => onClose()}
              className="border border-gray-300 w-full py-2 rounded-full text-black bg-gray-200 hover:bg-gray-300 hover:shadow-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogoutConformationModal;
