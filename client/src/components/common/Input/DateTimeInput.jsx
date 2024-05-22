import React from "react";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Controller, useFormContext } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";

function DateTimeInput({ name, label, required = false }) {
  const {
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();
  const onChange = (e) => {
    setValue(name, e.toISOString());
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="w-full flex flex-col gap-0 items-start">
        <label
          className="block capitalize tracking-wide text-gray-700 text-sm font-bold mb-2"
          htmlFor={name}
        >
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>

        <DateTimePicker
          defaultValue={getValues(name) ? dayjs(getValues(name)) : null}
          onChange={onChange}
          className="w-full py-0"
        />

        {errors[name] && <ErrorMessage message={errors[name].message} />}
      </div>
    </LocalizationProvider>
  );
}

export default DateTimeInput;
