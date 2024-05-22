import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FormProvider, useForm } from "react-hook-form";
import Input from "../Input/Input";
import { createEvent, updateEvent } from "../../../services/handlePostRequest";
import { clearEvents, setEvents } from "../../../redux/slices/eventsSlice";
import { getEvents } from "../../../services";

function EventFormProvider({ onCancel }) {
  const { event } = useSelector((state) => state.event);
  const [isSubmitting, setSubmitting] = useState(false);
  const formMethods = useForm({ defaultValues: { ...event, id: undefined } });
  const dispatch = useDispatch();
  const handleSuccess = async () => {
    // dispatch(clearEvents());
    const data = await getEvents();
    dispatch(setEvents({ events: data.events }));
  };
  const onSubmit = async (data) => {
    setSubmitting(true);
    let res;
    if (event.id) {
      res = await updateEvent(event.id, data);
    } else {
      res = await createEvent(data);
    }
    setSubmitting(false);
    if (res.event) {
      toast.success("Event added");
      handleSuccess();
      return onCancel();
    }
    toast.error(res.message);
  };

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={formMethods.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-3 justify-start items-start"
      >
        <h1 className="text-xl font-bold">Event detail</h1>
        <Input
          name="title"
          label="Event title"
          placeholder="Enter Title"
          type="text"
          required
        />
        <Input name="start" label="Start date" type="datetime" required />
        <Input name="end" label="End date" type="datetime" required />
        <p className="block capitalize tracking-wide text-gray-700 text-sm font-bold mb-2">
          Description
        </p>
        <textarea
          {...formMethods.register("description")}
          className="w-full border rounded border-gray-300"
          rows={3}
        ></textarea>
        <button
          type="submit"
          disabled={isSubmitting}
          className="py-3 px-6 border rounded-lg w-full sm:w-1/2 mx-auto bg-green-600 text-white"
        >
          {isSubmitting ? <Spinner /> : <p>{event.id ? "Save" : "Create"}</p>}
        </button>
      </form>
    </FormProvider>
  );
}

export default EventFormProvider;

function Spinner() {
  return (
    <div role="status" className="w-full flex justify-center">
      <svg
        aria-hidden="true"
        className="size-6 text-gray-200 animate-spin dark:text-gray-600 fill-white"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
