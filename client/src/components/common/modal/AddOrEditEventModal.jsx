import React from "react";
import Close from "../btns/Close";
import EventFormProvider from "../EventForms/EventFormProvider";

function AddOrEditEventModal({ onCancel }) {
  return (
    <div className="relative p-4 text-center bg-white rounded-lg shadow sm:p-5">
      <Close
        type="button"
        className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
        onClick={() => onCancel()}
      />
      <EventFormProvider onCancel={onCancel} />
    </div>
  );
}

export default AddOrEditEventModal;
