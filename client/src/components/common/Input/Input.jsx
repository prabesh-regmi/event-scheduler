import React from "react";
import NormalInput from "./NormalInput";
import Select from "./Select";
import DateTimeInput from "./DateTimeInput";

export default function Input(props) {
  if (props.type === "select") return <Select {...props} />;
  if (props.type === "datetime") return <DateTimeInput {...props} />;
  return <NormalInput {...props} />;
}
