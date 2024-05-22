import React, { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import ReactSelect from "react-select";
import ErrorMessage from "../ErrorMessage";

function Select({ name, label, options = [], required = false }) {
  const {
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();
  useEffect(() => {
    const defaultValue = options.find(
      (option) => option.value === getValues(name)
    );
    if (defaultValue) setValue(name, defaultValue);
  }, [options]);
  return (
    <div className="w-full">
      <label
        className="block capitalize tracking-wide text-gray-700 text-sm font-bold mb-2"
        htmlFor={name}
      >
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <Controller
        name={name}
        control={control}
        rules={{ required }}
        render={({ field }) => (
          <ReactSelect
            {...field}
            options={options}
            isClearable
            placeholder="Select option..."
          />
        )}
      />
      {errors[name] && <ErrorMessage message={errors[name].message} />}
    </div>
  );
}

export default Select;
