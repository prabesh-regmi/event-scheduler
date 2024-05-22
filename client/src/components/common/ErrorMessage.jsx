import React from "react";

export default function ErrorMessage({ className = "", message }) {
  return <p className={`error-message ${className}`}>{message}</p>;
}
