import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Calendar, luxonLocalizer, Views } from "react-big-calendar";
import { useDispatch, useSelector } from "react-redux";
import { DateTime, Settings } from "luxon";
import TimezoneSelect from "./TimeZoneSelect";
import "react-big-calendar/lib/css/react-big-calendar.css";
import ModalTemplateWithArgs from "../common/modal/ModalTemplateWithArgs";
import AddOrEditEventModal from "../common/modal/AddOrEditEventModal";
import { setAddEvent, setEditingEvent } from "../../redux/slices/eventSlice";

const defaultTZ = DateTime.local().zoneName;
function HeaderCellContent(props) {
  const { date, label } = props;
  const dayOfWeek = date.getDay();
  const className = dayOfWeek === 0 || dayOfWeek === 6 ? "text-red-500" : "";
  return <div className={className}>{label}</div>;
}
function DateCellContent(props) {
  const { holidays } = useSelector((state) => state.holidays);
  const { date, label } = props;
  const cDate = DateTime.fromJSDate(new Date(date));
  const dateString = cDate.toISODate();
  const isHoliday = holidays.findIndex(
    (holiday) => holiday.date === dateString
  );
  const dayOfWeek = date.getDay();
  const className =
    dayOfWeek === 0 || dayOfWeek === 6 || isHoliday !== -1
      ? "text-red-500"
      : "";
  return <div className={className}>{label}</div>;
}

export default function CustomCalendar({ events }) {
  const [timezone, setTimezone] = useState(defaultTZ);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleSelectSlot = useCallback(({ start, end }) => {
    setIsModalOpen(true);
    dispatch(setAddEvent({ start, end }));
  }, []);

  const handleSelectEvent = useCallback(
    ({ id, title, start, end, description }) => {
      setIsModalOpen(true);
      dispatch(
        setEditingEvent({ event: { id, title, start, end, description } })
      );
    },
    []
  );

  const { defaultDate, scrollToTime } = useMemo(
    () => ({
      defaultDate: new Date(2023, 3, 12),
      scrollToTime: new Date(1970, 1, 1, 6),
    }),
    []
  );

  const { getNow, localizer, myEvents } = useMemo(() => {
    Settings.defaultZone = timezone;
    return {
      getNow: () => DateTime.local().toJSDate(),
      localizer: luxonLocalizer(DateTime),
      myEvents: [
        ...events.map(({ title, id, start, description, end }) => ({
          title,
          id,
          description,
          start: new Date(start),
          end: new Date(end),
        })),
      ],
    };
  }, [timezone, events]);

  useEffect(
    () => () => {
      Settings.defaultZone = defaultTZ; // reset to browser TZ on unmount
    },
    []
  );
  return (
    <div className="flex flex-col gap-3 w-full">
      <TimezoneSelect
        defaultTZ={defaultTZ}
        setTimezone={setTimezone}
        timezone={timezone}
      />
      <div className="w-full">
        <Calendar
          defaultDate={defaultDate}
          defaultView={Views.WEEK}
          events={myEvents}
          getNow={getNow}
          localizer={localizer}
          scrollToTime={scrollToTime}
          selectable
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          components={{
            month: {
              header: HeaderCellContent,
              dateHeader: DateCellContent,
            },
          }}
        />
      </div>
      <ModalTemplateWithArgs
        isOpen={isModalOpen}
        width="w-[500px]"
        onClose={() => setIsModalOpen(false)}
      >
        <AddOrEditEventModal onCancel={() => setIsModalOpen(false)} />
      </ModalTemplateWithArgs>
    </div>
  );
}
