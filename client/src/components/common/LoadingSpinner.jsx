import React from "react";
import SubmitSpinner from "./SubmitSpinner";

function LoadingSpinner() {
  return (
    <div className="py-8 flex w-full justify-center items-center">
      <SubmitSpinner />
    </div>
  );
}

export default LoadingSpinner;
