import React from "react";
import moment from "moment";
import "moment-timezone";

const allZones = moment.tz.names();
allZones.unshift("clear");

export default function TimezoneSelect({
  defaultTZ = moment.tz.guess(),
  timezone,
  setTimezone,
}) {
  const onChange = ({ target: { value } }) => setTimezone(value || defaultTZ);

  return (
    <div>
      <p>Select a Timezone</p>
      <select
        className="form-control border px-2 py-1 rounded"
        style={{ width: 200, display: "inline-block" }}
        value={timezone}
        onChange={onChange}
      >
        {allZones.map((c, idx) => (
          <option key={idx} value={c !== "clear" ? c : ""}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
}
