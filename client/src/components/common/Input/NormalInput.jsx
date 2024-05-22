import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";

function NormalInput({
  name,
  label,
  type,
  validate,
  disabled = false,
  placeholder = "",
  required = false,
  className = "",
}) {
  const {
    register,
    getValues,
    formState: { errors },
  } = useFormContext();
  const [inputValue, setInputValue] = useState(getValues(name));
  const handleBlur = () => setInputValue(getValues(name));
  return (
    <div className="w-full flex flex-col justify-start items-start">
      <label
        className="block capitalize tracking-wide text-gray-700 text-sm font-bold mb-2"
        htmlFor={name}
      >
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        className={`appearance-none placeholder-gray-400 block w-full text-black border ${
          errors[name] ? "border-red-500" : "border-gray-300"
        }  rounded py-3.5 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-300 ${
          inputValue ? "bg-green-50" : "bg-white"
        } ${className}`}
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        {...register(name, {
          required: required ? "This field is required" : false,
          validate,
          onBlur: handleBlur,
        })}
      />
      {errors[name] && <ErrorMessage message={errors[name].message} />}
    </div>
  );
}

export default NormalInput;
